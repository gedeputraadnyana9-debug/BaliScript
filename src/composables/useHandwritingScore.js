const FONT_FAMILY = '"Noto Sans Balinese"';
const MIN_INK_PIXELS = 40;

export async function loadAksaraFont(character) {
  if (!document.fonts || !document.fonts.load) return;
  try {
    await document.fonts.load(`200px ${FONT_FAMILY}`, character);
  } catch {
    /* font unavailable: scoring still runs with the fallback glyph */
  }
}

function glyphAlpha(character, width, height) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const g = c.getContext("2d");
  const size = Math.round(Math.min(width, height) * 0.62);
  g.font = `${size}px ${FONT_FAMILY}, sans-serif`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillStyle = "#000";
  g.fillText(character, width / 2, height / 2);
  return g.getImageData(0, 0, width, height).data;
}

function toBinary(data, count, predicate) {
  const bin = new Uint8Array(count);
  for (let i = 0; i < count; i++) bin[i] = predicate(data[i * 4 + 3]) ? 1 : 0;
  return bin;
}

function integral(bin, width, height) {
  const W = width + 1;
  const sum = new Uint32Array(W * (height + 1));
  for (let y = 0; y < height; y++) {
    let row = 0;
    for (let x = 0; x < width; x++) {
      row += bin[y * width + x];
      sum[(y + 1) * W + (x + 1)] = sum[y * W + (x + 1)] + row;
    }
  }
  return sum;
}

function boxCount(sum, width, height, x, y, r) {
  const W = width + 1;
  const x0 = Math.max(0, x - r);
  const y0 = Math.max(0, y - r);
  const x1 = Math.min(width, x + r + 1);
  const y1 = Math.min(height, y + r + 1);
  return sum[y1 * W + x1] - sum[y0 * W + x1] - sum[y1 * W + x0] + sum[y0 * W + x0];
}

export function scoreHandwriting(canvas, character) {
  const width = canvas.width;
  const height = canvas.height;
  const count = width * height;
  const tol = Math.max(4, Math.round(Math.min(width, height) * 0.035));

  const userData = canvas.getContext("2d").getImageData(0, 0, width, height).data;
  const user = toBinary(userData, count, (a) => a > 0);
  const ref = toBinary(glyphAlpha(character, width, height), count, (a) => a > 0);

  let userTotal = 0;
  let refTotal = 0;
  for (let i = 0; i < count; i++) {
    userTotal += user[i];
    refTotal += ref[i];
  }
  if (userTotal < MIN_INK_PIXELS) return { score: 0, empty: true, precision: 0, recall: 0 };

  const refSum = integral(ref, width, height);
  const userSum = integral(user, width, height);

  let userMatched = 0;
  let refMatched = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (user[i] && boxCount(refSum, width, height, x, y, tol) > 0) userMatched++;
      if (ref[i] && boxCount(userSum, width, height, x, y, tol) > 0) refMatched++;
    }
  }

  const precision = userMatched / userTotal;
  const recall = refTotal ? refMatched / refTotal : 0;
  const f1 = precision + recall ? (2 * precision * recall) / (precision + recall) : 0;
  return {
    score: Math.round(f1 * 100),
    empty: false,
    precision: Math.round(precision * 100),
    recall: Math.round(recall * 100),
  };
}
