export interface Category {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  recipes: Recipe[];
}
export interface CartItem {
  id: number;
  productId: number;
  cartId?: number;
  quantity: number;
  product?: Product;
  cart?: Cart;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Cart {
  id: number;
  userId: number;
  cartItems?: CartItem[];
  user: User;
}

export interface User {
  email: string;
  image?: string;
  status?: string;
  createdAt: Date;
  // addresses: Address[];
  carts: Cart[];
  // classSubscriptions: ClassSubscription[];
  // gymSubscriptions: GymSubscription[];
  // orders: Order[];
}

export interface Recipe {
  id: number;
  name: string;
  image: string;
  description: string;
  recipeCategoryId: number;
  caloriesCount: number;
  ingredients: string;
  recipe1: string;
  recipeCategory?: Category;
}
