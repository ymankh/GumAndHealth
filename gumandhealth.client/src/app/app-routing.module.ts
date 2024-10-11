import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './nutrition/recipes/recipes.component';
import { TipsComponent } from './nutrition/tips/tips.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { NutritionComponent } from './nutrition/nutrition.component';
import { ProfileComponent } from './profile/profile.component';
import { GymsComponent } from './pages/gyms/gyms.component';
import { RecipeDetailComponent } from './nutrition/recipe-detail/recipe-detail.component';
import { SingleGymComponent } from './pages/single-gym/single-gym.component';
import { AdminClassesComponent } from './pages/admin-classes/admin-classes.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'displayClasses', component: AdminClassesComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'tips', component: TipsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'nutrition', component:NutritionComponent},
  { path: 'Profile', component: ProfileComponent },
  { path: 'Gyms', component: GymsComponent },
  { path: 'singleGym/:id', component: SingleGymComponent},
  { path: 'singleGym', component: SingleGymComponent },
  { path: 'Admin', component: AdminComponent },


  { path: 'recipe/:id', component: RecipeDetailComponent }, // مسار تفاصيل الوصفة

  { path: '**', component: HomeComponent, pathMatch: 'full' },

  // to home
  // { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
