import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NajlaaService } from '../../services/najlaa.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  gyms: any[] = [];
  constructor(private route: ActivatedRoute, private najlaaService: NajlaaService) { }


  ngOnInit() {
    this.najlaaService.getGyms().subscribe((data: any[]) => {
      this.gyms = data; // الحصول على بيانات الصالات
    });
  }
}
