import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { NajlaaService } from '../../../services/najlaa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-detiles-admin',
  templateUrl: './view-detiles-admin.component.html',
  styleUrls: ['./view-detiles-admin.component.css']
})
export class ViewDetilesAdminComponent implements OnInit {
  recipes: any[] = [];  // List of recipes

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private najlaaService: NajlaaService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.najlaaService.getRecipesByCategory1(id).subscribe(
        (recipes) => {
          console.log(recipes);
          this.recipes = recipes;  // Save the list of recipes
        },
        (error) => {
          console.error('Error fetching recipes:', error);
        }
      );
    }
  }

  deleteRecipe(id: number): void {
    // Show SweetAlert for delete confirmation
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'لن تتمكن من التراجع عن هذه العملية!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'نعم، احذفها!',
      cancelButtonText: 'إلغاء'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        // If user confirms, proceed with deletion
        this.najlaaService.deleteRecipe(id).subscribe(
          () => {
            // Show success message
            Swal.fire(
              'تم الحذف!',
              'تم حذف الوصفة بنجاح.',
              'success'
            );

            // Update the recipe list after deletion
            this.recipes = this.recipes.filter(recipe => recipe.id !== id);
          },
          (error: any) => {
            console.error('Error deleting recipe:', error);
            // Show error message
            Swal.fire(
              'خطأ!',
              'حدث خطأ أثناء حذف الوصفة.',
              'error'
            );
          }
        );
      }
    });
  }

  editRecipe(id: number): void {
    this.router.navigate(['/recipe-admin-put', id]);
  }

  generatePDF(recipe: any): void {
    if (recipe) {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text(recipe.name, 10, 10);
      doc.setFontSize(12);
      doc.text(`Description: ${recipe.description}`, 10, 30);
      doc.text(`Calories: ${recipe.caloriesCount}`, 10, 50);
      doc.text('Ingredients:', 10, 70);

      let ingredients = recipe.ingredients;
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
      doc.text(recipe.recipe1, 10, 135);
      doc.save(`${recipe.name}.pdf`);
    }
  }
}
