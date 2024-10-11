import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NajlaaService } from '../../services/najlaa.service';
import { Recipe } from '../../shared/interfaces';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe:any; // لتخزين تفاصيل الوصفة

  constructor(private route: ActivatedRoute, private najlaaService: NajlaaService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // الحصول على معرف الوصفة من المسار
    if (id) {
      this.najlaaService.getRecipeById(+id).subscribe(
        recipe => {
          console.log(recipe); // طباعة البيانات للتمكن من فحصها
          this.recipe = recipe; // حفظ تفاصيل الوصفة
        },
        error => {
          console.error('Error fetching recipe:', error); // في حالة حدوث خطأ
        }
      );
    }
  }

}
