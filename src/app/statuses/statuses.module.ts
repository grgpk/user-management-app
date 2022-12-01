import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusesComponent } from './statuses/statuses.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'statuses', component: StatusesComponent }];

@NgModule({
  declarations: [StatusesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class StatusesModule {}
