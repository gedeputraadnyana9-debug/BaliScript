const ADEG_ADEG = "\u1B44";

const CATEGORY = {
  swara: "Swara",
  wianjana: "Wianjana",
  gantungan: "Gantungan",
  gempelan: "Gempelan",
  suara: "Pangangge Suara",
  tenganan: "Pangangge Tenganan",
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

const swara = [
  ["\u1B05", "a", "A", "a"],
  ["\u1B07", "i", "I", "i"],
  ["\u1B09", "u", "U", "u"],
  ["\u1B0F", "e", "E", "e"],
  ["\u1B11", "o", "O", "o"],
].map(([character, slug, name, pronunciation]) =>
  buildItem({
    character,
    slug: `swara-${slug}`,
    title: `Swara ${name}`,
    pronunciation,
    category: CATEGORY.swara,
    level: "SD",
    summary: `Huruf vokal mandiri "${pronunciation}".`,
    description: `Swara ${name} adalah huruf vokal yang berdiri sendiri, tanpa huruf konsonan di depannya.`,
  })
);

const WIANJANA_DASAR = [
  ["\u1B33", "ha", "Ha", "ha"],
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

const WIANJANA_VARIAN = [
  ["\u1B14", "kha", "Kha", "kha", "Varian mahaprana dari Ka, dibaca dengan hembusan napas lebih kuat."],
  ["\u1B16", "gha", "Gha", "gha", "Varian mahaprana dari Ga, dibaca dengan hembusan napas lebih kuat."],
  ["\u1B19", "cha", "Cha", "cha", "Varian mahaprana dari Ca, dibaca dengan hembusan napas lebih kuat."],
  ["\u1B1B", "jha", "Jha", "jha", "Varian mahaprana dari Ja, dibaca dengan hembusan napas lebih kuat."],
  ["\u1B1D", "tta", "Tta", "tta", "Varian murdha dari Ta, ujung lidah dilengkungkan ke langit-langit."],
  ["\u1B1E", "ttha", "Ttha", "ttha", "Varian murdha mahaprana dari Ta."],
  ["\u1B1F", "dda", "Dda", "dda", "Varian murdha dari Da, ujung lidah dilengkungkan ke langit-langit."],
  ["\u1B20", "ddha", "Ddha", "ddha", "Varian murdha mahaprana dari Da."],
  ["\u1B21", "nna", "Nna", "nna", "Varian murdha dari Na, ujung lidah dilengkungkan ke langit-langit."],
  ["\u1B23", "tha", "Tha", "tha", "Varian mahaprana dari Ta (Ta Tawa), dibaca dengan hembusan napas lebih kuat."],
  ["\u1B25", "dha", "Dha", "dha", "Varian mahaprana dari Da (Da Madu), dibaca dengan hembusan napas lebih kuat."],
  ["\u1B28", "pha", "Pha", "pha", "Varian mahaprana dari Pa, dibaca dengan hembusan napas lebih kuat."],
  ["\u1B2A", "bha", "Bha", "bha", "Varian mahaprana dari Ba, dibaca dengan hembusan napas lebih kuat."],
  ["\u1B30", "ssa", "Ssa", "ssa", "Varian sa (Sa Saga) yang dibaca seperti s."],
  ["\u1B31", "sa-sapa", "Sa Sapa", "sa", "Varian sa (Sa Sapa) yang dibaca seperti s."],
];

const wianjana = [
  ...WIANJANA_DASAR.map(([character, slug, name, pronunciation]) =>
    buildItem({
      character,
      slug: `wianjana-${slug}`,
      title: `Aksara ${name}`,
      pronunciation,
      category: CATEGORY.wianjana,
      level: "SD",
      summary: `Huruf konsonan dasar "${pronunciation}".`,
      description: `Aksara ${name} adalah wianjana dasar yang dibaca "${pronunciation}". Huruf ini sering dipakai dalam kata sehari-hari di Bali.`,
    })
  ),
  ...WIANJANA_VARIAN.map(([character, slug, name, pronunciation, note]) =>
    buildItem({
      character,
      slug: `wianjana-${slug}`,
      title: `Aksara ${name}`,
      pronunciation,
      category: CATEGORY.wianjana,
      level: "SMP",
      summary: `Varian wianjana dibaca "${pronunciation}".`,
      description: note,
    })
  ),
];

const BASES = [
  { character: "\u1B13", slug: "ka", name: "Ka", stem: "k" },
  { character: "\u1B15", slug: "ga", name: "Ga", stem: "g" },
  { character: "\u1B18", slug: "ca", name: "Ca", stem: "c" },
  { character: "\u1B1A", slug: "ja", name: "Ja", stem: "j" },
  { character: "\u1B22", slug: "ta", name: "Ta", stem: "t" },
  { character: "\u1B27", slug: "pa", name: "Pa", stem: "p" },
  { character: "\u1B29", slug: "ba", name: "Ba", stem: "b" },
  { character: "\u1B2B", slug: "ma", name: "Ma", stem: "m" },
];

const SUBSCRIPTS = [
  { character: "\u1B2C", slug: "ya", name: "Ya", letter: "y" },
  { character: "\u1B2D", slug: "ra", name: "Ra", letter: "r" },
  { character: "\u1B2E", slug: "la", name: "La", letter: "l" },
  { character: "\u1B2F", slug: "wa", name: "Wa", letter: "w" },
];

const gantungan = BASES.flatMap((base) =>
  SUBSCRIPTS.map((sub) => {
    const pronunciation = `${base.stem}${sub.letter}a`;
    return buildItem({
      character: `${base.character}${ADEG_ADEG}${sub.character}`,
      slug: `gantungan-${base.slug}-${sub.slug}`,
      title: `Gantungan ${base.name} ${sub.name}`,
      pronunciation,
      category: CATEGORY.gantungan,
      level: "SMP",
      summary: `Huruf ${sub.name} ditulis di bawah ${base.name}, dibaca "${pronunciation}".`,
      description: `Gantungan ${sub.name} menempel di bawah huruf ${base.name}. Tanda adeg-adeg menghubungkan kedua huruf.`,
    });
  })
);

const gempelan = BASES.map((base) =>
  buildItem({
    character: `${base.character}${ADEG_ADEG}${base.character}`,
    slug: `gempelan-${base.slug}`,
    title: `Gempelan ${base.name}`,
    pronunciation: `${base.stem}${base.stem}a`,
    category: CATEGORY.gempelan,
    level: "SMA/SMK",
    summary: `Huruf ${base.name} yang dirangkap, dibaca "${base.stem}${base.stem}a".`,
    description: `Gempelan ${base.name} menggabungkan dua huruf ${base.name} dengan tanda adeg-adeg, sehingga bunyi ${base.stem} terdengar ganda.`,
  })
);

const VOWEL_SIGNS = [
  { character: "\u1B36", slug: "ulu", name: "Ulu", pronunciation: "ki", note: "bunyi i, ditulis di atas huruf." },
  { character: "\u1B38", slug: "suku", name: "Suku", pronunciation: "ku", note: "bunyi u, ditulis di bawah huruf." },
  { character: "\u1B42", slug: "pepet", name: "Pepet", pronunciation: "ke", note: "bunyi e lemah seperti pada kata enak." },
  { character: "\u1B3E", slug: "taleng", name: "Taleng", pronunciation: "ke", note: "bunyi e tegas, ditulis di sisi kanan huruf." },
  { character: "\u1B35", slug: "tedung", name: "Tedung", pronunciation: "kaa", note: "memanjangkan bunyi a." },
  { character: "\u1B40", slug: "taleng-tedung", name: "Taleng Tedung", pronunciation: "ko", note: "bunyi o, gabungan taleng dan tedung." },
];

const suara = VOWEL_SIGNS.map((sign) =>
  buildItem({
    character: `\u1B13${sign.character}`,
    slug: `suara-${sign.slug}`,
    title: `Pangangge ${sign.name}`,
    pronunciation: sign.pronunciation,
    category: CATEGORY.suara,
    level: "SD",
    summary: `Tanda vokal ${sign.name} pada huruf Ka, dibaca "${sign.pronunciation}".`,
    description: `Pangangge ${sign.name} mengubah bunyi huruf Ka: ${sign.note}`,
  })
);

const TENGANAN = [
  { character: "\u1B02", slug: "cecek", name: "Cecek", pronunciation: "kang", note: "menambahkan bunyi ng di akhir suku kata." },
  { character: "\u1B03", slug: "surang", name: "Surang", pronunciation: "kar", note: "menambahkan bunyi r di akhir suku kata." },
  { character: "\u1B04", slug: "bisah", name: "Bisah", pronunciation: "kah", note: "menambahkan bunyi h di akhir suku kata." },
];

const tenganan = TENGANAN.map((sign) =>
  buildItem({
    character: `\u1B13${sign.character}`,
    slug: `tenganan-${sign.slug}`,
    title: `Pangangge ${sign.name}`,
    pronunciation: sign.pronunciation,
    category: CATEGORY.tenganan,
    level: "SMP",
    summary: `Tanda akhir bunyi ${sign.name}, dibaca "${sign.pronunciation}".`,
    description: `Pangangge ${sign.name} ${sign.note}`,
  })
);

export const aksara = [...swara, ...wianjana, ...gantungan, ...gempelan, ...suara, ...tenganan];
