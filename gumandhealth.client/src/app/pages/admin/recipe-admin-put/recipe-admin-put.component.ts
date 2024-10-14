import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NajlaaService } from '../../../services/najlaa.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-admin-put',
  templateUrl: './recipe-admin-put.component.html',
  styleUrls: ['./recipe-admin-put.component.css']
})
export class RecipeAdminPutComponent implements OnInit {
  recipeForm: FormGroup;
  selectedFile: File | null = null;
  recipeCategories: any[] = [];
  recipeId: number | undefined = undefined; // Undefined initially
  currentImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private najlaaService: NajlaaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize the form with validation
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      caloriesCount: ['', Validators.required],
      ingredients: ['', Validators.required],
      recipe1: ['', Validators.required],
      recipeCategoryId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Fetch categories when the component initializes
    this.najlaaService.getRecipeCategories().subscribe(
      (categories: any[]) => {
        this.recipeCategories = categories;
      },
      (error) => {
        console.error('Error fetching recipe categories', error);
      }
    );

    // Get the recipeId from the route parameters and load the recipe
    this.recipeId = +this.route.snapshot.paramMap.get('id')!;
    this.loadRecipe(this.recipeId);
  }

  loadRecipe(id: number) {
    // Load the recipe data based on the ID
    this.najlaaService.getRecipeById123(id).subscribe(
      (recipe: any) => {
        this.recipeForm.patchValue({
          name: recipe.name,
          description: recipe.description,
          caloriesCount: recipe.caloriesCount,
          ingredients: recipe.ingredients,
          recipe1: recipe.recipe1,
          recipeCategoryId: recipe.recipeCategoryId
        });
        this.currentImage = recipe.image; // Set the current image for display
      },
      (error) => {
        console.error('Error fetching recipe data', error);
      }
    );
  }

  onFileSelected(event: any) {
    // Handle file selection
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.recipeForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.recipeForm.get('name')?.value);
    formData.append('description', this.recipeForm.get('description')?.value);
    formData.append('caloriesCount', this.recipeForm.get('caloriesCount')?.value);
    formData.append('ingredients', this.recipeForm.get('ingredients')?.value);
    formData.append('recipe1', this.recipeForm.get('recipe1')?.value);
    formData.append('recipeCategoryId', this.recipeForm.get('recipeCategoryId')?.value);

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile, this.selectedFile.name);
    }

    // Update the recipe
    this.najlaaService.updateRecipe(this.recipeId!, formData).subscribe({
      next: (response: any) => {
        console.log('Recipe updated successfully', response);
        // Navigate to the recipe listing or any other appropriate page
        this.router.navigate(['/view-detiles-admin', this.recipeForm.get('recipeCategoryId')?.value]);
      },
      error: (error: any) => {
        console.error('Error occurred while updating recipe', error);
      }
    });
  }
}
