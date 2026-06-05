export interface ShippingInfo {
  free: boolean;
  cost: number;
  days: number;
}

export interface InstallmentInfo {
  count: number;
  value: number;
  interest: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  title: string;
  tagline: string;
  description: string;
  detailedDescription: string;
  price: number;
  originalPrice: number;
  discount: number; // e.g. 15 for 15%
  rating: number;
  ratingCount: number;
  installments: InstallmentInfo;
  images: string[];
  category: string;
  specs: ProductSpec[];
  isLightning: boolean;
  isBestSeller: boolean;
  isRecommended: boolean;
  stock: number;
  shipping: ShippingInfo;
  brand: string;
  reviews: Review[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string; // references lucide icons
  color: string; // for category visual badge
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minPurchase: number;
}
