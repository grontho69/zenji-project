export type ProductCategory = 'tees' | 'hoodies' | 'pants' | 'sweaters' | 'outerwear' | 'accessories';
export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  id: string;
  name: string;
  japaneseTitle: string;
  dropNumber: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  fit: string;
  gsmWeight: number;
  sizes: ProductSize[];
  stockCount: number;
  inStock: boolean;
  images: string[];
  description: string;
  details: string[];
  tags?: string[];
  isFeatured?: boolean;
  isNewRelease?: boolean;
  isOnSale?: boolean;
  colorway?: string;
  animeInspiration?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "demon-blood-tee",
    name: "DEMON BLOOD TEE",
    japaneseTitle: "鬼血 // 呼吸の型 01",
    dropNumber: "DROP_001",
    price: 33.99,
    originalPrice: 39.99,
    category: "tees",
    fit: "Oversized Boxy Silhouette",
    gsmWeight: 320,
    sizes: ["S", "M", "L", "XL"],
    stockCount: 4,
    inStock: true,
    isFeatured: true,
    isNewRelease: true,
    isOnSale: true,
    colorway: "Vintage Washed Black / Blood Crimson",
    animeInspiration: "Demon Slayer / Kimetsu",
    tags: ["SALE 15% OFF", "LIMITED DROP", "DEMON BLOOD", "OVERSIZED"],
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "Born from the warrior spirit. Features an intricate multi-layered Japanese demon art screenprint capturing dark breathing techniques and flame embers on 320 GSM heavyweight combed cotton.",
    details: [
      "320 GSM 100% Combed Heavy Cotton Jersey",
      "1.25\" High-density ribbed crew collar (zero bacon neck)",
      "High-density breathable discharge print with zero hand-feel",
      "Signature relaxed drop-shoulder oversized boxy fit",
      "Vintage stone-washed enzyme finish for broken-in softness",
      "Serialized ZENJI woven authenticity label on hem"
    ]
  },
  {
    id: "blue-flame-tee",
    name: "BLUE FLAME TEE",
    japaneseTitle: "青炎 // 蒼き炎 02",
    dropNumber: "DROP_001",
    price: 33.99,
    originalPrice: 39.99,
    category: "tees",
    fit: "Heavyweight Boxy Drop-Shoulder",
    gsmWeight: 320,
    sizes: ["S", "M", "L", "XL"],
    stockCount: 7,
    inStock: true,
    isFeatured: true,
    isNewRelease: true,
    isOnSale: true,
    colorway: "Obsidian Black / Cyan Cobalt",
    animeInspiration: "Jujutsu / Blue Flames",
    tags: ["SALE 15% OFF", "POPULAR", "BLUE FLAME"],
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "Cold thermal destruction. Showcases an electric blue flame samurai entity rendered in 12-color high-definition screenprinting across the back, accented with Japanese kanji calligraphy.",
    details: [
      "320 GSM Ultra-Heavy Combed Cotton",
      "Vibrant cobalt & cyan multi-pass plastisol graphic",
      "Reinforced double-needle shoulder & hem stitching",
      "Custom pre-shrunk treatment for lifetime dimensional stability",
      "Matte black woven hem label with Japanese serial cipher"
    ]
  },
  {
    id: "domain-expansion-tee",
    name: "DOMAIN EXPANSION TEE",
    japaneseTitle: "領域展開 // 無量空処 03",
    dropNumber: "DROP_001",
    price: 39.99,
    category: "tees",
    fit: "Oversized Boxy Silhouette",
    gsmWeight: 340,
    sizes: ["S", "M", "L", "XL"],
    stockCount: 11,
    inStock: true,
    isFeatured: true,
    isNewRelease: true,
    isOnSale: false,
    colorway: "Washed Carbon / Void Violet",
    animeInspiration: "Jujutsu Kaisen / Gojo",
    tags: ["DOMAIN EXPANSION", "LIMITED BATCH", "ANIME STREETWEAR"],
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "Command the void. Inspired by infinite information domains, this piece blends technical typography with celestial anime hand-seal iconography in reflective 3M ink.",
    details: [
      "340 GSM Heavyweight Compact French Jersey",
      "Reflective 3M Scotchlite hand-seal graphics on chest & spine",
      "Thick tight-knit rib collar with elastic retention core",
      "Enzyme vintage silicone wash for signature drape",
      "No restocks. Ever."
    ]
  },
  {
    id: "warrior-spirit-tee",
    name: "WARRIOR SPIRIT TEE",
    japaneseTitle: "武士道 // 闘志 04",
    dropNumber: "DROP_001",
    price: 33.99,
    originalPrice: 39.99,
    category: "tees",
    fit: "Oversized Heavyweight Cut",
    gsmWeight: 320,
    sizes: ["S", "M", "L", "XL"],
    stockCount: 5,
    inStock: true,
    isFeatured: true,
    isNewRelease: false,
    isOnSale: true,
    colorway: "Vintage Washed Black / Gold Ember",
    animeInspiration: "Samurai / Bushido",
    tags: ["SALE 15% OFF", "BUSHIDO", "WARRIOR SPIRIT"],
    images: [
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "Born from the warrior spirit. For the dreamers, fighters, creators, and outsiders who forge their own discipline.",
    details: [
      "320 GSM 100% Combed Heavy Cotton",
      "Traditional Sumi-e ink inspired samurai illustration",
      "Double-stitched seams & drop-shoulder geometry",
      "Embossed silicone ZENJI badge on chest"
    ]
  },
  {
    id: "will-of-the-sun-tee",
    name: "WILL OF THE SUN TEE",
    japaneseTitle: "日の呼吸 // 太陽の意志 05",
    dropNumber: "DROP_001",
    price: 33.99,
    originalPrice: 39.99,
    category: "tees",
    fit: "Relaxed Boxy Fit",
    gsmWeight: 320,
    sizes: ["S", "M", "L", "XL"],
    stockCount: 8,
    inStock: true,
    isFeatured: false,
    isNewRelease: true,
    isOnSale: true,
    colorway: "Charcoal Black / Solar Gold",
    animeInspiration: "Sun Breathing",
    tags: ["SALE 15% OFF", "SUN BREATHING", "SOLAR"],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "Channel the primordial flame. Back piece features the radiant solar dragon breathing form with Japanese calligraphy down the right sleeve.",
    details: [
      "320 GSM Ring-Spun Cotton Jersey",
      "High-density discharge print that softens with every wash",
      "Custom vintage distressed mineral wash treatment",
      "Heavyweight collar ribbing"
    ]
  },
  {
    id: "neo-tokyo-cyber-hoodie",
    name: "NEO-TOKYO // CYBER HOODIE",
    japaneseTitle: "アキラ // ネオ東京 06",
    dropNumber: "DROP_001",
    price: 129.99,
    originalPrice: 159.99,
    category: "hoodies",
    fit: "520 GSM Heavyweight Oversized Boxy",
    gsmWeight: 520,
    sizes: ["S", "M", "L", "XL"],
    stockCount: 3,
    inStock: true,
    isFeatured: true,
    isNewRelease: true,
    isOnSale: true,
    colorway: "Obsidian Black / Cyber Crimson",
    animeInspiration: "Akira / Neo-Tokyo",
    tags: ["520 GSM", "HEAVYWEIGHT HOODIE", "LIMITED RUN"],
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "The flagship piece. 520 GSM ultra-heavy French Terry cotton with deep double-layered hood, 3M reflective kanji spinal print, and raw distressed edges.",
    details: [
      "520 GSM Custom-Milled 100% Organic French Terry Cotton",
      "3D Puff screenprint & 3M retro-reflective typography",
      "Double-layered heavy storm hood with matte black eyelets",
      "Laser-etched ZENJI serialized metal badge"
    ]
  },
  {
    id: "shinobi-tactical-cargos",
    name: "SHINOBI-OPS // TACTICAL CARGO",
    japaneseTitle: "忍 // 機動戦術 07",
    dropNumber: "DROP_001",
    price: 149.99,
    originalPrice: 179.99,
    category: "pants",
    fit: "Wide-Leg Articulated Tactical Taper",
    gsmWeight: 380,
    sizes: ["S", "M", "L", "XL"],
    stockCount: 6,
    inStock: true,
    isFeatured: true,
    isNewRelease: false,
    isOnSale: false,
    colorway: "Matte Stealth Black",
    animeInspiration: "Shinobi / Techwear",
    tags: ["CORDURA", "TACTICAL", "WATER REPELLENT"],
    images: [
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "Engineered for covert transit. Built with abrasion-resistant 380 GSM Ripstop & Cordura fabric with 8 tactical pockets and adjustable toggle cinch hems.",
    details: [
      "380 GSM Heavyweight Tactical Ripstop (Cordura Blend)",
      "Teflon™ EcoElite DWR weather-resistant coating",
      "8-Pocket tactical architecture with YKK Aquaguard® zippers",
      "Dual adjustable bungee cinch hems"
    ]
  },
  {
    id: "mecha-jacquard-knit",
    name: "MECHA-SYNTH // JACQUARD KNIT",
    japaneseTitle: "機甲 // 電脳織物 08",
    dropNumber: "DROP_001",
    price: 159.99,
    originalPrice: 189.99,
    category: "sweaters",
    fit: "Relaxed Boxy Knit Silhouette",
    gsmWeight: 480,
    sizes: ["S", "M", "L", "XL"],
    stockCount: 5,
    inStock: true,
    isFeatured: true,
    isNewRelease: true,
    isOnSale: false,
    colorway: "Obsidian / Crimson / Cyber Gray",
    animeInspiration: "Evangelion / Mecha",
    tags: ["JACQUARD", "MERINO BLEND", "LIMITED"],
    images: [
      "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "A masterwork of digital brutalism woven into tactile reality. 12-gauge double-jacquard knit with mecha telemetry schematics across a soft merino-cotton blend.",
    details: [
      "480 GSM 12-Gauge Double-Jacquard Intarsia Knit",
      "50% Merino Wool / 50% Combed Cotton blend",
      "Thick 2x2 ribbed collar, cuffs, and hem",
      "Heavyweight thermal insulation with non-scratch interior"
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'ALL ARTIFACTS', japaneseLabel: '全アイテム' },
  { id: 'tees', label: 'GRAPHIC TEES', japaneseLabel: 'Tシャツ' },
  { id: 'hoodies', label: 'HOODIES', japaneseLabel: 'パーカー' },
  { id: 'pants', label: 'CARGOS', japaneseLabel: 'パンツ' },
  { id: 'sweaters', label: 'KNITWEAR', japaneseLabel: 'ニット' }
] as const;

export const BRAND_ETHOS = {
  tagline: "WEAR YOUR STORY",
  japaneseTagline: "あなたの物語を身に纏え",
  subheading: "BORN FROM THE WARRIOR SPIRIT.",
  manifesto: "ZENJI began with one belief: what you wear should tell a story. Inspired by samurai discipline, anime art and modern street culture, we create premium streetwear for those who choose their own path. Every ZENJI piece combines Japanese-inspired artwork, powerful symbolism and oversized silhouettes to express courage, creativity and individuality. For the dreamers. Fighters. Creators. Outsiders.",
  secondaryManifesto: "We exist at the intersection of technical precision and cultural expression. Our garments are engineered for those navigating an increasingly fragmented world, built from Japanese craftsmanship, anime culture and modern streetwear. Wear the Arc. Anime-inspired streetwear for gamers and otaku. Every drop limited. No restocks. Ever."
};
