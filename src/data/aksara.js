const ADEG_ADEG = "\u1B44";

const CATEGORY = {
  wianjana: "Aksara Bali",
  gantungan: "Gantungan & Gempélan",
  suara: "Pangangge Suara",
  angka: "Angka",
};

function buildItem({ character, slug, title, pronunciation, category, level, summary, description }) {
  return {
    id: slug,
    slug,
    title,
    category,
    character,
    pronunciation,
    summary,
    description,
    imageUrl: `/images/aksara/${slug}.svg`,
    audioUrl: `/audio/aksara/${slug}.mp3`,
    highlights: [`Bunyi: ${pronunciation}`, `Kelompok: ${category}`],
    level,
  };
}

/* ── Aksara Bali (18 huruf dasar) ───────────────────────────── */
const WIANJANA_DASAR = [
  ["\u1B33", "ha", "Ha", "ha", "A/Ha"],
  ["\u1B26", "na", "Na", "na", "Na"],
  ["\u1B18", "ca", "Ca", "ca", "Ca"],
  ["\u1B2D", "ra", "Ra", "ra", "Ra"],
  ["\u1B13", "ka", "Ka", "ka", "Ka"],
  ["\u1B24", "da", "Da", "da", "Da"],
  ["\u1B22", "ta", "Ta", "ta", "Ta"],
  ["\u1B32", "sa", "Sa", "sa", "Sa"],
  ["\u1B2F", "wa", "Wa", "wa", "Wa"],
  ["\u1B2E", "la", "La", "la", "La"],
  ["\u1B2B", "ma", "Ma", "ma", "Ma"],
  ["\u1B15", "ga", "Ga", "ga", "Ga"],
  ["\u1B29", "ba", "Ba", "ba", "Ba"],
  ["\u1B17", "nga", "Nga", "nga", "Nga"],
  ["\u1B27", "pa", "Pa", "pa", "Pa"],
  ["\u1B1A", "ja", "Ja", "ja", "Ja"],
  ["\u1B2C", "ya", "Ya", "ya", "Ya"],
  ["\u1B1C", "nya", "Nya", "nya", "Nya"],
];

const wianjana = WIANJANA_DASAR.map(([character, slug, name, pronunciation, label]) =>
  buildItem({
    character,
    slug: `wianjana-${slug}`,
    title: `Aksara ${label || name}`,
    pronunciation,
    category: CATEGORY.wianjana,
    level: "SD",
    summary: `Huruf konsonan dasar "${pronunciation}".`,
    description: `Aksara ${label || name} adalah wianjana dasar yang dibaca "${pronunciation}". Huruf ini sering dipakai dalam kata sehari-hari di Bali.`,
  })
);

/* ── Gantungan & Gempélan (18 huruf) ───────────────────────── */
const GANTUNGAN_DATA = [
  ["\u1B33", "ha", "A", "a"],
  ["\u1B26", "na", "Na", "na"],
  ["\u1B18", "ca", "Ca", "ca"],
  ["\u1B2D", "ra", "Ra", "ra"],
  ["\u1B13", "ka", "Ka", "ka"],
  ["\u1B24", "da", "Da", "da"],
  ["\u1B22", "ta", "Ta", "ta"],
  ["\u1B32", "sa", "Sa", "sa"],
  ["\u1B2F", "wa", "Wa", "wa"],
  ["\u1B2E", "la", "La", "la"],
  ["\u1B2B", "ma", "Ma", "ma"],
  ["\u1B15", "ga", "Ga", "ga"],
  ["\u1B29", "ba", "Ba", "ba"],
  ["\u1B17", "nga", "Nga", "nga"],
  ["\u1B27", "pa", "Pa", "pa"],
  ["\u1B1A", "ja", "Ja", "ja"],
  ["\u1B2C", "ya", "Ya", "ya"],
  ["\u1B1C", "nya", "Nya", "nya"],
];

const gantungan = GANTUNGAN_DATA.map(([character, slug, name, pronunciation]) =>
  buildItem({
    character: `\u1B13${ADEG_ADEG}${character}`,
    slug: `gantungan-${slug}`,
    title: `Gantungan ${name}`,
    pronunciation,
    category: CATEGORY.gantungan,
    level: "SMP",
    summary: `Bentuk gantungan dari aksara ${name}, dibaca "${pronunciation}".`,
    description: `Gantungan ${name} adalah bentuk aksara ${name} yang ditulis menempel di bawah huruf lain ketika dua konsonan berurutan. Digunakan dalam penggabungan huruf.`,
  })
);

/* ── Pangangge Suara (6 tanda vokal) ──────────────────────── */
const VOWEL_SIGNS = [
  { character: "\u1B36", slug: "ulu", name: "Ulu", pronunciation: "i", note: "bunyi i, ditulis di atas huruf." },
  { character: "\u1B38", slug: "suku", name: "Suku", pronunciation: "u", note: "bunyi u, ditulis di bawah huruf." },
  { character: "\u1B3E", slug: "taleng", name: "Talèng", pronunciation: "e", note: "bunyi e, ditulis di depan huruf." },
  { character: "\u1B35", slug: "tedong", name: "Tedong", pronunciation: "aa", note: "memanjangkan bunyi vokal a." },
  { character: "\u1B40", slug: "taleng-tedong", name: "Taleng Tedong", pronunciation: "o", note: "bunyi o, gabungan talèng dan tedong." },
  { character: "\u1B42", slug: "pepet", name: "Pepet", pronunciation: "ë", note: "bunyi e pepet (seperti pada kata 'enak')." },
];

const suara = VOWEL_SIGNS.map((sign) =>
  buildItem({
    character: `\u1B13${sign.character}`,
    slug: `suara-${sign.slug}`,
    title: `Pangangge ${sign.name}`,
    pronunciation: sign.pronunciation,
    category: CATEGORY.suara,
    level: "SD",
    summary: `Tanda vokal ${sign.name}, dibaca "${sign.pronunciation}".`,
    description: `Pangangge ${sign.name} mengubah bunyi huruf: ${sign.note}`,
  })
);

/* ── Angka Bali (0-9) ─────────────────────────────────────── */
const ANGKA_DATA = [
  ["\u1B50", "0", "0", "nol"],
  ["\u1B51", "1", "1", "satu"],
  ["\u1B52", "2", "2", "dua"],
  ["\u1B53", "3", "3", "tiga"],
  ["\u1B54", "4", "4", "empat"],
  ["\u1B55", "5", "5", "lima"],
  ["\u1B56", "6", "6", "enam"],
  ["\u1B57", "7", "7", "tujuh"],
  ["\u1B58", "8", "8", "delapan"],
  ["\u1B59", "9", "9", "sembilan"],
];

const angka = ANGKA_DATA.map(([character, slug, name, pronunciation]) =>
  buildItem({
    character,
    slug: `angka-${slug}`,
    title: `Angka ${name}`,
    pronunciation,
    category: CATEGORY.angka,
    level: "SD",
    summary: `Angka Bali untuk bilangan ${pronunciation}.`,
    description: `Angka ${name} dalam aksara Bali digunakan untuk menulis bilangan ${pronunciation}. Angka Bali memiliki bentuk yang khas dan berbeda dari angka Arab.`,
  })
);

export const aksara = [...wianjana, ...gantungan, ...suara, ...angka];
