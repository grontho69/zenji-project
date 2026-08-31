export type ProductCategory = 'hoodies' | 'tees' | 'pants' | 'sweaters' | 'outerwear' | 'accessories';

export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  id: string;
  name: string;
  japaneseTitle: string; // e.g. 'アキラ // ネオ東京 01'
  dropNumber: string; // e.g. 'DROP_001'
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  fit: string; // e.g. 'Oversized Boxy Fit', 'Wide-Leg Tactical'
  gsmWeight: number; // e.g. 520 GSM
  sizes: ProductSize[];
  stockCount: number;
  inStock: boolean;
  images: string[];
  description: string;
  details: string[];
  tags?: string[];
  isFeatured?: boolean;
  isNewRelease?: boolean;
  colorway?: string;
}
