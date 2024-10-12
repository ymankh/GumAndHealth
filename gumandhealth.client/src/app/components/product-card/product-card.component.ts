import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../../services/product-service.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../shared/interfaces';
import { root } from '../../shared/constants';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  products: Product[] = [];
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
        this.products = products; // Adjust the response handling to match your API response
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
        this.products = response; // Directly assign the response, since it's an array of Product[]
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
}
