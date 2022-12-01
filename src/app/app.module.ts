import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersModule } from 'src/app/users/users.module';
import { CategoriesModule } from 'src/app/categories/categories.module';
import { StatusesModule } from 'src/app/statuses/statuses.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    UsersModule,
    CategoriesModule,
    StatusesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
