import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'categories', component: CategoriesComponent }];

@NgModule({
  declarations: [CategoriesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CategoriesModule {}
