import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

import { Status } from 'src/app/models/status.interface';
import { statusResponse } from 'src/app/models/statusResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private apiUrl = 'http://localhost:3000/statuses';
  private filterInputSubject = new BehaviorSubject<string>('');
  filterInput$ = this.filterInputSubject.asObservable();

  constructor(private http: HttpClient) {}

  getFilterInput(filter: string): void {
    this.filterInputSubject.next(filter);
  }

  getStatuses(page: number): Observable<statusResponse> {
    return combineLatest([
      this.http.get<statusResponse>(this.apiUrl + `?page=${page - 1}`),
      this.filterInput$,
    ]).pipe(
      map(([response, filterInput]) => {
        return {
          ...response,
          statuses: response.statuses.filter((status) => {
            return filterInput
              ? status.name
                  .trim()
                  .toLowerCase()
                  .includes(filterInput.trim().toLowerCase())
              : true;
          }),
        };
      })
    );
  }

  addStatus(status: Status): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/add', status);
  }

  updateStatus(status: Status): Observable<any> {
    return this.http.patch<any>(this.apiUrl + `/${status._id}`, {
      name: status.name,
    });
  }

  removeStatus(status: Status): Observable<any> {
    return this.http.delete<any>(this.apiUrl + `/${status._id}`);
  }
}
