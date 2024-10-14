import { Component } from '@angular/core';
import { ProductsRRService } from '../../../services/products-rr.service';

@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrl: './get-product.component.css'
})
export class GetProductComponent {
  ngOnInit() {
    this.GetALLProducts();
  }

  constructor(private _ser: ProductsRRService) { }
  products: any[] = []
  selectedProduct: any = null;
  GetALLProducts() {
    this._ser.getAllProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching instructors:', error);
      }
    );
  }


  //////////////////////////////////////////////////////////////


  editProduct(id: number) {
    this.selectedProduct = this.products.find(i => i.id === id); 
  }

  //////////////////////////////////////////////////////////////

  deleteProduct(id: number) {
    if (confirm("Are you sure you want to delete this Product?")) {
      this._ser.deleteProduct(id).subscribe(
        (response) => {
          this.GetALLProducts(); 
        },
        (error) => {
          console.error('Error deleting instructor:', error);
        }
      );
    }
  }

  //////////////////////////////////////////////////////////////
  closeModal() {
    this.selectedProduct = null; 
  }
}

