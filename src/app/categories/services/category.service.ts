import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

import { Category } from 'src/app/models/category.interface';
import { categoryResponse } from 'src/app/models/categoryResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/categories';
  private filterInputSubject = new BehaviorSubject<string>('');
  filterInput$ = this.filterInputSubject.asObservable();

  constructor(private http: HttpClient) {}

  getFilterInput(filter: string): void {
    this.filterInputSubject.next(filter);
  }

  getCategories(page: number): Observable<categoryResponse> {
    return combineLatest([
      this.http.get<categoryResponse>(this.apiUrl + `?page=${page - 1}`),
      this.filterInput$,
    ]).pipe(
      map(([response, filterInput]) => {
        return {
          ...response,
          categories: response.categories.filter((category) => {
            return filterInput
              ? category.name
                  .trim()
                  .toLowerCase()
                  .includes(filterInput.trim().toLowerCase())
              : true;
          }),
        };
      })
    );
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
