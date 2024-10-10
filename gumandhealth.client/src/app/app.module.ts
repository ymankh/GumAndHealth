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
import { AboutUSComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    NutritionComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutUSComponent,
    AboutComponent,
    BlogComponent,
    ClassesComponent,
    ContactComponent,
  ],
  imports: [
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
export class AppModule {}
