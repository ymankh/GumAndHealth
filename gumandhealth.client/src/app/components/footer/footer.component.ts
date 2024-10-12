import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(public router: Router) { }

  shouldShowFooter(): boolean {
    // Add your route condition here. Example: Hide footer on the "/Shop" page.
    return this.router.url !== '/Shop';  // Adjust '/Shop' to match the path you want
  }
}
