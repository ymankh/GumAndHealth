import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../../services/product-service.service'; // Import the service
import { Product } from '../../../shared/interfaces'; // Import product interface
import { Router } from '@angular/router'; // Import router for navigation

@Component({
  selector: 'app-admin-products',
  templateUrl: './adminproducts.component.html',
  styleUrls: ['./adminproducts.component.css']
})
export class AdminProductsComponent implements OnInit {

  products: Product[] = []; // Store products
  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    image1: '',
    categoryId: 0,             // Default category ID
    discount: 0,               // Default discount value
    tags: '',                  // Default tags value
    additionalInformation: ''   // Default additional information
  };
  isEditMode: boolean = false;  // Used to determine if editing mode is enabled

  constructor(
    private productService: ProductServiceService,  // Inject the service
    private router: Router                          // Inject the router
  ) { }

  ngOnInit(): void {
    this.loadAllProducts(); // Load products on init
  }

  // Load all products from API
  loadAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  // Create a new product
  createProduct(): void {
    this.productService.createProduct(this.newProduct).subscribe(
      (response) => {
        console.log('Product created successfully', response);
        this.loadAllProducts(); // Refresh product list
      },
      (error) => {
        console.error('Error creating product', error);
      }
    );
  }

  // Update existing product
  updateProduct(): void {
    if (this.newProduct.id) {
      this.productService.updateProduct(this.newProduct.id, this.newProduct).subscribe(
        (response) => {
          console.log('Product updated successfully', response);
          this.loadAllProducts(); // Refresh product list
          this.isEditMode = false; // Reset edit mode
        },
        (error) => {
          console.error('Error updating product', error);
        }
      );
    }
  }

  // Set the selected product for editing
  editProduct(product: Product): void {
    this.newProduct = { ...product };  // Clone product to edit
    this.isEditMode = true;
  }

  // Delete product
  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      (response) => {
        console.log(`Product with ID ${id} deleted successfully`);
        this.loadAllProducts(); // Refresh product list
      },
      (error) => {
        console.error('Error deleting product', error);
      }
    );
  }
}
