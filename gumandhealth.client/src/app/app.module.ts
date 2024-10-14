import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NutritionComponent } from './nutrition/nutrition.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminClassEditComponent } from './pages/admin-class-edit/admin-class-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipsComponent } from './nutrition/tips/tips.component';
import { GymsComponent } from './pages/gyms/gyms.component';
import { RecipesComponent } from './nutrition/recipes/recipes.component';
import { RecipeDetailComponent } from './nutrition/recipe-detail/recipe-detail.component';
import { SingleGymComponent } from './pages/single-gym/single-gym.component';
//import { AdminClassesComponent } from './pages/admin-classes/admin-classes.component';
import { ClassDetailsComponent } from './pages/class-details/class-details.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { LoginComponent } from './pages/login/login.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { RecipeCategoryAdminComponent } from './pages/admin/recipe-category-admin/recipe-category-admin.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { RecipeCategoryAdminPostComponent } from './pages/admin/recipe-category-admin-post/recipe-category-admin-post.component';
import { ViewDetilesAdminComponent } from './pages/admin/view-detiles-admin/view-detiles-admin.component';
import { RecipeAdminPostComponent } from './pages/admin/recipe-admin-post/recipe-admin-post.component';
import { VirifyOtpComponent } from './pages/virify-otp/virify-otp.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { AdminScheduleComponent } from './pages/admin-schedule/admin-schedule.component';
import { AdminProductsComponent } from './pages/admin/adminproducts/adminproducts.component';
import { RecipeCategoryAdminPutComponent } from './pages/admin/recipe-category-admin-put/recipe-category-admin-put.component';
import { RecipeAdminPutComponent } from './pages/admin/recipe-admin-put/recipe-admin-put.component';
import { OrderAdminComponent } from './pages/admin/order-admin/order-admin.component';
import { EditScheduleComponent } from './pages/admin/edit-schedule/edit-schedule.component';
import { AllScheduleComponent } from './pages/admin/all-schedule/all-schedule.component';
import { GetInstructorComponent } from './pages/admin/get-instructor/get-instructor.component';
import { EditInstructorComponent } from './pages/admin/edit-instructor/edit-instructor.component';
import { AdminShowClassesComponent } from './pages/admin/admin-show-classes/admin-show-classes.component';
import { AddNewClassComponent } from './pages/admin/add-new-class/add-new-class.component';

import { GetProductComponent } from './pages/admin/get-product/get-product.component';
import { EditProductComponent } from './pages/admin/edit-product/edit-product.component';
import { AdminUserComponent } from './pages/admin/admin-user/admin-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NutritionComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    //AdminClassesComponent,
    AdminClassEditComponent,
    AboutComponent,
    BlogComponent,
    ClassesComponent,
    ContactComponent,
    ProfileComponent,
    TipsComponent,
    GymsComponent,
    RecipesComponent,
    RecipeDetailComponent,
    SingleGymComponent,
    ClassDetailsComponent,
    ProductsComponent,
    ProductCardComponent,
    LoginComponent,
    ShopComponent,
    CartComponent,
    RecipeCategoryAdminComponent,

    RegisterComponent,
    ResetPasswordComponent,
    TipsComponent,
    EditProfileComponent,
    TestimonialsComponent,
    RecipeCategoryAdminPostComponent,
    ViewDetilesAdminComponent,
    RecipeAdminPostComponent,
    VirifyOtpComponent,
    AdminLoginComponent,
    PasswordResetComponent,
    AdminScheduleComponent,
    AdminProductsComponent,
    RecipeCategoryAdminPutComponent,
    RecipeAdminPutComponent,
    AdminProductsComponent,
    OrderAdminComponent,
    EditScheduleComponent,
    AllScheduleComponent,

    GetInstructorComponent,
      EditInstructorComponent,
      AdminShowClassesComponent,
      AddNewClassComponent,
      GetProductComponent,
      EditProductComponent,
      AdminUserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
