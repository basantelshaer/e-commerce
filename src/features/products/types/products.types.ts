export interface ProductsResponse {
  results: number;
  metadata: Metadata;
  data: Product[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

/* ---------------- Product ---------------- */

export interface Product {
  _id: string;
  id: string;

  title: string;
  slug: string;
  description: string;

  price: number;
  priceAfterDiscount?: number;

  quantity: number;

  sold: number | null;

  images: string[];
  imageCover: string;

  ratingsAverage: number;
  ratingsQuantity: number;

  category: Category;
  brand: Brand;
  subcategory: Subcategory[];

  createdAt: string;
  updatedAt: string;

  availableColors?: string[];
}

/* ---------------- Category ---------------- */

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

/* ---------------- Brand ---------------- */

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

/* ---------------- Subcategory ---------------- */

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}
export interface SingleProductResponse {
  data: Product;
}