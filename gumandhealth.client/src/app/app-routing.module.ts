import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminClassEditComponent } from './pages/admin-class-edit/admin-class-edit.component';
import { TipsComponent } from './nutrition/tips/tips.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { GymsComponent } from './pages/gyms/gyms.component';
import { RecipesComponent } from './nutrition/recipes/recipes.component';
import { RecipeDetailComponent } from './nutrition/recipe-detail/recipe-detail.component';
import { SingleGymComponent } from './pages/single-gym/single-gym.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminClassesComponent } from './pages/admin-classes/admin-classes.component';
import { ClassDetailsComponent } from './pages/class-details/class-details.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { NutritionComponent } from './nutrition/nutrition.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin/edit-class', component: AdminClassEditComponent },
  { path: 'nutrition/tips', component: TipsComponent },
  { path: 'gyms', component: GymsComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/:id', component: RecipeDetailComponent },
  { path: 'nutrition', component: NutritionComponent },
  { path: 'Profile', component: ProfileComponent },
  { path: 'Testimonials', component: TestimonialsComponent },
  { path: 'edit-profile/:id', component: EditProfileComponent},
  { path: 'Gyms', component: GymsComponent },
  { path: 'singleGym/:id', component: SingleGymComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/classes', component: AdminClassesComponent },
  { path: 'class-details/:id', component: ClassDetailsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Wildcard route to redirect invalid paths to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
