import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NajlaaService } from '../../services/najlaa.service';
import { jsPDF } from 'jspdf'; // استيراد jsPDF

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: any; // لتخزين تفاصيل الوصفة

  constructor(private route: ActivatedRoute, private najlaaService: NajlaaService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // الحصول على معرف الوصفة من المسار

    if (id) {
      this.najlaaService.getRecipeById(+id).subscribe(
        recipe => {
          console.log("recipe",recipe); // طباعة البيانات للتمكن من فحصها
          this.recipe = recipe; // حفظ تفاصيل الوصفة
        },
        error => {
          console.error('Error fetching recipe:', error); // في حالة حدوث خطأ
        }
      );
    }
  }

  // دالة لتوليد ملف PDF
  generatePDF(): void {
    if (this.recipe) {
      const doc = new jsPDF();

      // إعداد العنوان
      doc.setFontSize(18);
      doc.text(this.recipe.name, 10, 10);

      // إضافة الوصف
      doc.setFontSize(12);
      doc.text(`Description: ${this.recipe.description}`, 10, 30);

      // إضافة السعرات الحرارية
      doc.text(`Calories: ${this.recipe.caloriesCount}`, 10, 50);

      // التحقق من المكونات (ingredients)
      doc.text('Ingredients:', 10, 70);

      let ingredients = this.recipe.ingredients;

      // إذا كانت المكونات سلسلة نصية، قم بتحويلها إلى مصفوفة بناءً على الفواصل أو أي معيار آخر
      if (typeof ingredients === 'string') {
        ingredients = ingredients.split(','); // افتراض أن المكونات مفصولة بفواصل
      }

      // التحقق من كون المكونات مصفوفة، ثم عرضها
      if (Array.isArray(ingredients)) {
        ingredients.forEach((ingredient: string, index: number) => {
          doc.text(`${index + 1}. ${ingredient}`, 10, 80 + index * 10);
        });
      } else {
        doc.text('No ingredients available', 10, 80);
      }

      // إضافة الخطوات
      doc.text('Recipe:', 10, 125);
      doc.text(this.recipe.recipe1, 10, 135);

      // حفظ الملف بصيغة PDF
      doc.save(`${this.recipe.name}.pdf`);
    }
  }
}
