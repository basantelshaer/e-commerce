export interface WishlistProduct {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  ratingsAverage: number;
}

export interface WishlistResponse {
  status: string;
  count: number;
  data: WishlistProduct[];
}