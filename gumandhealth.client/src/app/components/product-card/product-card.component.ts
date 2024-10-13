import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../../services/product-service.service';
import { CartService } from '../../services/cart.service';
import { Product, Category } from '../../shared/interfaces'; // Import Category here
import { root } from '../../shared/constants';

export interface ProductWithDescription extends Product {
  showDescription?: boolean; // Add an optional showDescription property
}



@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  products: ProductWithDescription[] = [];
  filteredProducts: ProductWithDescription[] = []; // Property for filtered products
  categories: Category[] = []; // Add this property to store categories
  minPrice: number = 0; // Default minimum price
  maxPrice: number = 1000; // Default maximum price
  categoryId: number | null = null;


  constructor(
    private route: ActivatedRoute,
    readonly productService: ProductServiceService,
    readonly cart: CartService
  ) { }

  ngOnInit(): void {
    // Fetch the category ID from the route parameters
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.categoryId) {
      // If a category ID is provided, load products for that category
      this.loadProductsForCategory(this.categoryId);
    } else {
      // If no category ID is provided, load all products
      this.loadAllProducts();
    }
  }

  // Fetch products for the specific category
  loadProductsForCategory(id: number): void {
    this.productService.getProductsByCategoryId(id).subscribe(
      (products) => {
        // Map each product to include showDescription: false initially
        this.products = products.map((product) => ({
          ...product,
          showDescription: false,
        }));
      },
      (error) => {
        console.error('Error fetching products for category', error);
      }
    );
  }

  // Load all products if no category is specified
  loadAllProducts(): void {
    this.productService.getProducts().subscribe(
      (response) => {
        // Map each product to include showDescription: false initially
        this.products = response.map((product) => ({
          ...product,
          showDescription: false,
        }));
      },
      (error) => {
        console.error('Error fetching all products', error);
      }
    );
  }

  // Add product to the cart
  addToCart(product: Product): void {
    this.cart.addToCart({
      productId: product.id,
      product: product,
      quantity: 1,
    });
    console.log('Added to cart:', product);
  }

  // Show product details (can be used to navigate to another page or modal)
  showDetails(product: Product): void {
    console.log('Product details:', product);
  }

  // Dynamically construct image URLs
  imageurl(image: string | undefined): string {
    return image ? `${root}/${image}` : 'path/to/default/image.jpg'; // Add fallback for missing images
  }

  filterByPrice(): void {
    this.filteredProducts = this.products.filter(
      (product) => product.price >= this.minPrice && product.price <= this.maxPrice
    );
  }

  // Method for handling category selection (optional, can be improved)
  onCategorySelect(categoryId: number): void {
    this.productService.getProductsByCategoryId(categoryId).subscribe(
      (response) => {
        this.filteredProducts = response.filter(
          (product) => product.price >= this.minPrice && product.price <= this.maxPrice
        );
      },
      (error) => {
        console.error('Error loading category products', error);
      }
    );
  }

  // Toggle description visibility
  toggleDescription(product: ProductWithDescription): void {
    product.showDescription = !product.showDescription;
  }
}
