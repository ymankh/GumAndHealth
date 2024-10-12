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
import { FormsModule } from '@angular/forms';
import { TipsComponent } from './nutrition/tips/tips.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';

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
    EditProfileComponent,
    TestimonialsComponent
  ],
  imports: [
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
