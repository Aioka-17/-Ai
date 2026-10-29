export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  isHit?: boolean;
  isNew?: boolean;
  images: string[];
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  description: string;
  specifications: Record<string, string>;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export type Page = 'catalog' | 'product' | 'cart' | 'checkout' | 'thank-you';

export interface CheckoutFormData {
  name: string;
  phone: string;
  address: string;
  comment: string;
}

export interface PlacedOrder {
  orderNumber: string;
  items: CartItem[];
  totalAmount: number;
  customer: CheckoutFormData;
  createdAt: string;
}
