export interface AddToCartInterface {
  productName: string;
  description: string;
  price: number;
  userId: number | null;
  productId: number;
  imageLink: string;
  quantity: number;
  size: string | number;
}
