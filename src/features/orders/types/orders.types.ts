// Shipping Address
export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

// User in Order
export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

// Subcategory
export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// Category
export interface OrderCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Brand
export interface OrderBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Product in Order
export interface OrderProduct {
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: OrderCategory;
  brand: OrderBrand;
  ratingsAverage: number;
  id: string;
}

// Cart Item in Order
export interface OrderCartItem {
  count: number;
  _id: string;
  product: OrderProduct;
  price: number;
}

// Payment Method Type
export type PaymentMethodType = "cash" | "card";

// Order
export interface Order {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: PaymentMethodType;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: OrderUser;
  cartItems: OrderCartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
  paidAt?: string;
}

// Orders Response (array of orders)
export type OrdersResponse = Order[ ];