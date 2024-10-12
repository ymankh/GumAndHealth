import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { Category } from '../../types/category.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  categories: Category[] = [];  // Property to hold the categories

  constructor(private shopService: ShopService) { }  // Inject the service

  ngOnInit(): void {
    this.getCategories();  // Fetch categories when component initializes
  }

  // Method to fetch categories
  getCategories(): void {
    this.shopService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;  // Assign the data to the categories property
      },
      (error) => {
        console.error('Error fetching categories:', error);  // Handle errors
      }
    );
  }
}
