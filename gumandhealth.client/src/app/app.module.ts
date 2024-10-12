import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NutritionComponent } from './nutrition/nutrition.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipsComponent } from './nutrition/tips/tips.component';
import { GymsComponent } from './pages/gyms/gyms.component';
import { RecipesComponent } from './nutrition/recipes/recipes.component';
import { RecipeDetailComponent } from './nutrition/recipe-detail/recipe-detail.component';
import { SingleGymComponent } from './pages/single-gym/single-gym.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminClassesComponent } from './pages/admin-classes/admin-classes.component';
import { ClassDetailsComponent } from './pages/class-details/class-details.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { LoginComponent } from './pages/login/login.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NutritionComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    BlogComponent,
    ClassesComponent,
    ContactComponent,
    ProfileComponent,
    TipsComponent,
    GymsComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeDetailComponent,
    GymsComponent,
    SingleGymComponent,
    AdminComponent,
    AdminClassesComponent,
    ClassDetailsComponent,
    ProductsComponent,
    ProductCardComponent,
    LoginComponent,
    TipsComponent,
    ShopComponent,
    CartComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    // RouterModule.forRoot(routes) // إضافة المسارات هنا
  ],

  //ما في داعي نحط الراوتس هون يا جماعة.. لازم جوا ال
  // app-routing.module

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
