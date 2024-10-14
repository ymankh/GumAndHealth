import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { NajlaaService } from '../../../services/najlaa.service';

@Component({
  selector: 'app-view-detiles-admin',
  templateUrl: './view-detiles-admin.component.html',
  styleUrls: ['./view-detiles-admin.component.css']
})
export class ViewDetilesAdminComponent implements OnInit {
  recipe: any; // لتخزين تفاصيل الوصفة

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private najlaaService: NajlaaService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // الحصول على معرف الوصفة من المسار
    if (id) {
      this.najlaaService.getRecipeById(+id).subscribe(
        recipe => {
          console.log(recipe);
          this.recipe = recipe; // حفظ تفاصيل الوصفة
        },
        error => {
          console.error('Error fetching recipe:', error);
        }
      );
    }
  }

  editRecipe(id: number): void {
    // Redirect to the edit page with the recipe ID
    this.router.navigate(['/recipe-admin-put', id]);
  }

  backToRecipes(): void {
    // Navigate back to the recipes list
    this.router.navigate(['/recipe-category-admin']);
  }

  generatePDF(): void {
    // كود توليد PDF كما هو
    if (this.recipe) {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text(this.recipe.name, 10, 10);
      doc.setFontSize(12);
      doc.text(`Description: ${this.recipe.description}`, 10, 30);
      doc.text(`Calories: ${this.recipe.caloriesCount}`, 10, 50);
      doc.text('Ingredients:', 10, 70);

      let ingredients = this.recipe.ingredients;
      if (typeof ingredients === 'string') {
        ingredients = ingredients.split(',');
      }

      if (Array.isArray(ingredients)) {
        ingredients.forEach((ingredient: string, index: number) => {
          doc.text(`${index + 1}. ${ingredient.trim()}`, 10, 80 + index * 10);
        });
      } else {
        doc.text('No ingredients available', 10, 80);
      }

      doc.text('Recipe:', 10, 125);
      doc.text(this.recipe.recipe1, 10, 135);
      doc.save(`${this.recipe.name}.pdf`);
    }
  }
}
