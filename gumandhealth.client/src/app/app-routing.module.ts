import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './nutrition/recipes/recipes.component';
import { TipsComponent } from './nutrition/tips/tips.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'recipes', component: RecipesComponent },
  { path: 'tips', component: TipsComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
