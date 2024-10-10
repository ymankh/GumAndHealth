import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './nutrition/recipes/recipes.component';
import { TipsComponent } from './nutrition/tips/tips.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ClassesComponent } from './pages/classes/classes.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent },
  { path: 'tips', component: TipsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' },

  // to home
  // { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
