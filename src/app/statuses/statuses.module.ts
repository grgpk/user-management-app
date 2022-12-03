import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusesComponent } from './statuses/statuses.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{ path: 'statuses', component: StatusesComponent }];

@NgModule({
  declarations: [StatusesComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class StatusesModule {}
