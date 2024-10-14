import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsRRService } from '../../../services/products-rr.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @Input() product: any; // Input for the product to be edited
  @Output() close = new EventEmitter<void>(); // Event emitter to close the edit component
  imageFile: File | null = null; // Variable to hold the selected image
  categoryName: string = ''; // Variable to hold the category name

  constructor(private productService: ProductsRRService) { }

  ngOnInit(): void {
    // Initialize categoryName with the product's category
    this.categoryName = this.product.categoryName || '';
  }

  // Method to handle image selection
  onImageSelected(event: any): void {
    const file: File = event.target.files[0]; // Get the first selected file
    if (file) {
      this.imageFile = file; // Store the file
      console.log('Selected image file:', this.imageFile);
    } else {
      console.log('No file selected.');
    }
  }

  // Method to update the product
  updateProduct(form: any) {
    if (form.valid) {
      const formData = new FormData();

      // Append product data to FormData
      for (let key in this.product) {
        formData.append(key, this.product[key]);
      }

      // Append image if selected
      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }

      // Append category name
      formData.append('categoryName', this.categoryName);

      // Make the PUT request to update the product
      this.productService.updateProducts(this.product.id, formData).subscribe(
        (response) => {
          console.log('Product updated successfully!', response);
          this.close.emit(); // Emit close event after successful update
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    }
  }

  // Method to cancel editing and close the modal
  cancelEdit() {
    this.close.emit(); // Emit the close event to close the component
  }
}
