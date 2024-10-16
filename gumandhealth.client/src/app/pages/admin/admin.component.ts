import { Component } from '@angular/core';
import { HosamService } from '../../services/hosam.service'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})


export class AdminComponent {

  constructor(
    private hosamService: HosamService,
  ) { }

  activeMenu: string = '';  // To keep track of which menu is open


  isAdmin = true;


  toggleSubMenu(menu: string): void {
    if (this.activeMenu === menu) {
      this.activeMenu = ''; // Close the menu if it's already open
    } else {
      this.activeMenu = menu; // Open the selected menu
    }
    
  }
  logout() {
    this.hosamService.logout();
    }
}
