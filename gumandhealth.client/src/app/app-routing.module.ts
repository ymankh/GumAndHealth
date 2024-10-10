import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './nutrition/recipes/recipes.component';
import { TipsComponent } from './nutrition/tips/tips.component';

const routes: Routes = [
  { path: 'recipes', component: RecipesComponent },
  { path: 'tips', component: TipsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
