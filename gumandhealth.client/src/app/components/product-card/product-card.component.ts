import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { Product } from '../../shared/interfaces';
import { CartService } from '../../services/cart.service';
import {root } from '../../shared/constants'
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  products: Product[] = [];
  constructor(
    readonly productService: ProductServiceService,
    readonly cart: CartService
  ) {}
  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products.products;
    });
  }
  addToCart(product: Product) {
    this.cart.addToCart({
      productId: product.id,
      quantity: 1,
    });
    console.log(product);
  }
  showDetails(product: Product) {
    console.log(product);
  }

  imageurl(image: string|undefined ) {return root+"/" +image }


}
