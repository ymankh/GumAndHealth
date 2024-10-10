import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NutritionComponent } from './nutrition/nutrition.component';
import { RecipesComponent } from './nutrition/recipes/recipes.component';
import { TipsComponent } from './nutrition/tips/tips.component';

// تعريف المسارات
const routes: Routes = [
  { path: 'recipes', component: RecipesComponent },
  { path: 'tips', component: TipsComponent },
  { path: 'nutrition', component: NutritionComponent }
  
];

@NgModule({
  declarations: [
    AppComponent,
    NutritionComponent,
    RecipesComponent,
    TipsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes) // إضافة المسارات هنا
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
