import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from 'src/app/models/status.interface';
import { statusResponse } from 'src/app/models/statusResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private apiUrl = 'http://localhost:3000/statuses';

  constructor(private http: HttpClient) {}

  getStatuses(page: number): Observable<statusResponse> {
    return this.http.get<statusResponse>(this.apiUrl + `?page=${page - 1}`);
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
