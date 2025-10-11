export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  collection: string | null;
  size: string;
  seo_title: string;
  seo_description: string;
  keywords: string;
  image_url: string | null;
  images?: string[];
  status: string;
  created_at: string;
  updated_at: string;
  price?: number;
}

export const CATEGORIES = {
  COLCHA: 'colcha',
  EDREDOM: 'edredom',
  JOGO_DE_CAMA: 'jogo-de-cama',
  COBERDROM: 'coberdrom',
  TRAVESSEIRO: 'travesseiro',
} as const;

export const CATEGORY_LABELS = {
  colcha: 'Colchas',
  edredom: 'Edredons',
  'jogo-de-cama': 'Jogos de Cama',
  coberdrom: 'Coberdroms',
  travesseiro: 'Travesseiros',
} as const;
