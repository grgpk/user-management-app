import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Category } from 'src/app/models/category.interface';
import { categoryResponse } from 'src/app/models/categoryResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  getCategories(page: number): Observable<categoryResponse> {
    return this.http.get<categoryResponse>(this.apiUrl + `?page=${page - 1}`);
  }

  addCategory(category: Category): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/add', category);
  }

  updateCategory(category: Category): Observable<any> {
    return this.http.patch<any>(this.apiUrl + `/${category._id}`, {
      name: category.name,
    });
  }

  removeCategory(category: Category): Observable<any> {
    return this.http.delete<any>(this.apiUrl + `/${category._id}`);
  }
}
