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
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { GymsComponent } from './pages/gyms/gyms.component';
import { RecipesComponent } from './nutrition/recipes/recipes.component';
import { RecipeDetailComponent } from './nutrition/recipe-detail/recipe-detail.component';
import { SingleGymComponent } from './pages/single-gym/single-gym.component';

import { ClassDetailsComponent } from './pages/class-details/class-details.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { NutritionComponent } from './nutrition/nutrition.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { RecipeCategoryAdminComponent } from './pages/admin/recipe-category-admin/recipe-category-admin.component';
import { RecipeCategoryAdminPostComponent } from './pages/admin/recipe-category-admin-post/recipe-category-admin-post.component';
import { ViewDetilesAdminComponent } from './pages/admin/view-detiles-admin/view-detiles-admin.component';
import { RecipeAdminPostComponent } from './pages/admin/recipe-admin-post/recipe-admin-post.component';
import { GetInstructorComponent } from './pages/admin/get-instructor/get-instructor.component';
import { EditInstructorComponent } from './pages/admin/edit-instructor/edit-instructor.component';
import { VirifyOtpComponent } from './pages/virify-otp/virify-otp.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';

import { RecipeCategoryAdminPutComponent } from './pages/admin/recipe-category-admin-put/recipe-category-admin-put.component';
import { RecipeAdminPutComponent } from './pages/admin/recipe-admin-put/recipe-admin-put.component';
import { AdminScheduleComponent } from './pages/admin-schedule/admin-schedule.component';

import { AdminProductsComponent } from './pages/admin/adminproducts/adminproducts.component'; // Import the AdminProductsComponent
import { EditScheduleComponent } from './pages/admin/edit-schedule/edit-schedule.component';
import { AllScheduleComponent } from './pages/admin/all-schedule/all-schedule.component';
import { OrderAdminComponent } from './pages/admin/order-admin/order-admin.component';
import { AdminShowClassesComponent } from './pages/admin/admin-show-classes/admin-show-classes.component';
import { AddNewClassComponent } from './pages/admin/add-new-class/add-new-class.component';
import { GetProductComponent } from './pages/admin/get-product/get-product.component';
import { EditProductComponent } from './pages/admin/edit-product/edit-product.component';
import { GetAllUserComponent } from './pages/admin/get-all-user/get-all-user.component';
import { GetContactMessagesComponent } from './pages/admin/get-contact-messages/get-contact-messages.component';
import { PostScheduleComponent } from './pages/admin/post-schedule/post-schedule.component';
import { GetGymAllComponent } from './pages/admin/get-gym-all/get-gym-all.component';
import { POSTGymComponent } from './pages/admin/post-gym/post-gym.component';
import { PutGymComponent } from './pages/admin/put-gym/put-gym.component';
import { ReplayContactComponent } from './pages/admin/replay-contact/replay-contact.component';
import { RecipescateoryComponent } from './nutrition/recipescateory/recipescateory.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'Schedule', component: AdminScheduleComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'Messages', component: GetContactMessagesComponent },
  { path: 'admin/edit-class/:id', component: AdminClassEditComponent },
  { path: 'nutrition/tips', component: TipsComponent },
  { path: 'gyms', component: GymsComponent },
  { path: 'recipes/:id', component: RecipesComponent },
  { path: 'recipes1/:id', component: RecipeDetailComponent },
  { path: 'gym/:id', component: SingleGymComponent },
  { path: 'nutrition', component: NutritionComponent },
  { path: 'Profile', component: ProfileComponent },
  { path: 'Testimonials', component: TestimonialsComponent },
  { path: 'edit-profile/:id', component: EditProfileComponent },
  { path: 'Gyms', component: GymsComponent },
  { path: 'singleGym/:id', component: SingleGymComponent },
  { path: 'AddScedule', component: PostScheduleComponent },


  { path: 'class-details/:id', component: ClassDetailsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'singleGym', component: SingleGymComponent },
  { path: 'products/:id', component: ProductCardComponent },
  { path: 'Dashboard', component: AdminComponent },
  { path: 'GetInstructor', component: GetInstructorComponent },
  { path: 'EditInstructor', component: EditInstructorComponent },
  { path: 'edit-schedule/:id', component: EditScheduleComponent },
  { path: 'Allschedule', component: AllScheduleComponent },
  { path: 'AllClasses', component: AdminShowClassesComponent },
  { path: 'AddNewClass', component: AddNewClassComponent },
  { path: 'Replay', component: ReplayContactComponent },





  { path: 'recipe-category-admin', component: RecipeCategoryAdminComponent },

  { path: 'ClassDetails/:id', component: ClassDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'PostRecipe', component: RecipeCategoryAdminPostComponent },
  { path: 'recipe-category-admin-put/:id', component: RecipeCategoryAdminPutComponent },
  { path: 'recipe-admin-put/:id', component: RecipeAdminPutComponent },
  {
    path: 'order - admin', component: OrderAdminComponent },

  { path: 'getAllProducts', component: GetProductComponent},
  { path: 'editProducts', component: EditProductComponent },

  { path: 'put-gym/:id', component: PutGymComponent }, // Edit gym route

  { path: 'get-gym-all', component:GetGymAllComponent },
  { path: 'post-gym', component: POSTGymComponent },
  { path: 'recipescateory', component: RecipescateoryComponent  },

  { path: 'view-detiles-admin/:id', component: ViewDetilesAdminComponent },
  { path: 'GetAllUser', component: GetAllUserComponent },
  { path: 'recipe-admin-post', component: RecipeAdminPostComponent },
  { path: 'admin/products', component: AdminProductsComponent },
  { path: 'products/category/:id', component: ProductCardComponent }, // or ProductsComponent if that's the correct name
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'products/category/:id', component: ProductCardComponent }, // or ProductsComponent if that's the correct name
  { path: 'virifyOtp', component: VirifyOtpComponent },
  { path: 'admin', component: AdminLoginComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
  // Wildcard route to redirect invalid paths to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
