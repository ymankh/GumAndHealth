import { NgModule } from '@angular/core';
import { AdminComponent } from './pages/admin/admin.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminClassEditComponent } from './pages/admin-class-edit/admin-class-edit.component';
import { TipsComponent } from './nutrition/tips/tips.component';
import { GymsComponent } from './pages/gyms/gyms.component';
import { RecipesComponent } from './nutrition/recipes/recipes.component';
import { RecipeDetailComponent } from './nutrition/recipe-detail/recipe-detail.component';
import { SingleGymComponent } from './pages/single-gym/single-gym.component';
import { AdminClassesComponent } from './pages/admin-classes/admin-classes.component';
import { ClassDetailsComponent } from './pages/class-details/class-details.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin/edit-class/:id', component: AdminClassEditComponent },
  { path: 'nutrition/tips', component: TipsComponent },
  { path: 'gyms', component: GymsComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/:id', component: RecipeDetailComponent },
  { path: 'gym/:id', component: SingleGymComponent },
  { path: 'admin/classes', component: AdminClassesComponent },
  { path: 'class-details/:id', component: ClassDetailsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Wildcard route to redirect invalid paths to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
