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
  categories: Category[] = []; // To store categories fetched from the API
  selectedCategoryId: number | null = null; // To store selected category from dropdown
  minPrice: number = 0; // Default minimum price
  maxPrice: number = 1000; // Default maximum price

  constructor(
    private route: ActivatedRoute,
    readonly productService: ProductServiceService,
    readonly cart: CartService
  ) { }

  ngOnInit(): void {
    this.loadAllProducts(); // Load all products initially
    this.loadCategories(); // Load categories for the dropdown list

    // Check if categoryId is passed in the URL
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.selectedCategoryId = +categoryId;
      this.filterByCategory();
    }
  }

  // Load all products initially
  loadAllProducts(): void {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response.map((product) => ({
          ...product,
          showDescription: false,
        }));
        this.filteredProducts = [...this.products]; // Initially, all products are shown
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  // Load all categories from the API
  loadCategories(): void {
    this.productService.getCategories().subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  // Filter products by selected category
  filterByCategory(): void {
    if (this.selectedCategoryId) {
      // Call the method to get products by category ID
      this.productService.getProductsByCategoryId(this.selectedCategoryId).subscribe(
        (response) => {
          this.filteredProducts = response.filter(
            (product) => product.price >= this.minPrice && product.price <= this.maxPrice
          );
        },
        (error) => {
          console.error('Error fetching products by category', error);
        }
      );
    }
  }



  // Filter products by price range
  filterByPrice(): void {
    this.filteredProducts = this.products.filter(
      (product) => product.price >= this.minPrice && product.price <= this.maxPrice
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

  // Toggle description visibility
  toggleDescription(product: ProductWithDescription): void {
    product.showDescription = !product.showDescription;
  }



  fetchAllCategories(): void {
    // Call the method to get all products from the AllProducts API
    this.productService.getAllProducts().subscribe(
      (response) => {
        this.filteredProducts = response.filter(
          (product) => product.price >= this.minPrice && product.price <= this.maxPrice
        );
      },
      (error) => {
        console.error('Error fetching all products', error);
      }
    );
  }


  // Dynamically construct image URLs
  imageurl(image: string | undefined): string {
    return image ? `${root}/${image}` : 'path/to/default/image.jpg'; // Add fallback for missing images
  }
}
