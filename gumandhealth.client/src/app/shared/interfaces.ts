export interface Category {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  recipes: Recipe[];
}
export interface CartItem {
  id?: number;
  productId: number;
  cartId?: number;
  quantity: number;
  product?: Product;
  cart?: Cart;
}

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  price: number;
  discount: number;
  tags: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  image7?: string;
  description: string;
  additionalInformation: string;
  cartItems?: CartItem[];
  category?: Category;
  orderItems?: OrderItem[];
}

export interface OrderItem {
  id: number;
  productId: number;
  orderId: number;
  quantity: number;
  product?: Product;
  order?: Order;
}

interface Order {
  id: number;
  userId: number;
  orderItems?: OrderItem[];
  user?: User;
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

export interface ProductPagedResult
{
    totalCount :number;
    totalPages : number; 
    currentPage : number;
    pageSize : number;
    products :Product[];  
}
