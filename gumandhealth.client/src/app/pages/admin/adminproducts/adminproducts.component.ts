import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../../services/product-service.service';
import { Product } from '../../../shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './adminproducts.component.html',
  styleUrls: ['./adminproducts.component.css']
})
export class AdminProductsComponent implements OnInit {

  products: Product[] = []; // Array to store products
  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    image1: '', // Updated field name to match API
    categoryId: 0,
    discount: 0,
    tags: '',
    additionalInformation: ''
  };
  selectedFile: File | null = null; // Used to store the selected image file
  isEditMode: boolean = false; // Flag to check if editing mode is enabled

  constructor(
    private productService: ProductServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAllProducts(); // Load all products on component initialization
  }

  // Handle file selection from file input
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Create a new product
  createProduct(): void {
    const formData = new FormData();
    formData.append('name', this.newProduct.name);
    formData.append('description', this.newProduct.description);
    formData.append('price', this.newProduct.price.toString());
    formData.append('categoryId', this.newProduct.categoryId.toString());
    formData.append('discount', this.newProduct.discount.toString());
    formData.append('tags', this.newProduct.tags);
    formData.append('additionalInformation', this.newProduct.additionalInformation);

    if (this.selectedFile) {
      formData.append('image1', this.selectedFile); // Append image file with correct field name
    }

    this.productService.createProduct(formData).subscribe(
      (response) => {
        console.log('Product created successfully:', response);
        this.loadAllProducts(); // Refresh product list after creation
        this.resetForm(); // Reset form after creation
      },
      (error) => {
        console.error('Error creating product:', error);
      }
    );
  }

  // Load all products from the API
  loadAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }


  updateProduct(): void {
    const formData = new FormData();
    formData.append('name', this.newProduct.name);
    formData.append('description', this.newProduct.description);
    formData.append('price', this.newProduct.price.toString());
    formData.append('categoryId', this.newProduct.categoryId.toString());
    formData.append('discount', this.newProduct.discount.toString());
    formData.append('tags', this.newProduct.tags);
    formData.append('additionalInformation', this.newProduct.additionalInformation);

    if (this.selectedFile) {
      formData.append('image1', this.selectedFile); // Append the image file for updating
    }

    this.productService.updateProduct(this.newProduct.id, formData).subscribe(
      (response) => {
        console.log('Product updated successfully:', response);
        this.loadAllProducts(); // Refresh product list after update
        this.isEditMode = false; // Exit edit mode
        this.resetForm(); // Reset form after update
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }

  // Reset form fields after creating or updating a product
  resetForm(): void {
    this.newProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      image1: '',
      categoryId: 0,
      discount: 0,
      tags: '',
      additionalInformation: ''
    };
    this.selectedFile = null; // Reset file input
    this.isEditMode = false; // Reset editing mode
  }
}
