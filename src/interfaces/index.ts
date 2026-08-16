export interface ImageType {
  url: string;
  public_id: string;
}
export interface Category {
  id: string;
  name: string;
  image: ImageType;
  created_at: Date;
  updated_at: Date;
}
export interface Product {
  id: string;
  name: string;
  slug: string;
  image: ImageType;
  price: number;
  discount: number | null;
  description: string;
  isAvailable: boolean;
  created_at: Date;
  updated_at: Date;
  category_id: string;
}

export interface CategoryWithProducts {
  id: string;
  name: string;
  image: ImageType;
  created_at: Date;
  updated_at: Date;
  products: Product[];
}

export interface Size {
  price: string;
  size: {
    name: string;
    id: string;
  };
}
export interface Extra {
  price: string;
  extra: {
    name: string;
    id: string;
  };
}

export type InputType = {
  type: string;
  name: string;
  placeholder: string;
  id: string;
  label: string;
};
