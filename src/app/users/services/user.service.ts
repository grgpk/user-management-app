import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + `?page=${page - 1}`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + `/${id}`);
  }

  removeUser(user: User): Observable<any> {
    return this.http.delete(this.apiUrl + `/${user._id}`);
  }

  updateUser(user: User): Observable<any> {
    return this.http.patch(this.apiUrl + `/${user._id}`, {
      email: user.email,
      personalNumber: user.personalNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      category: user.category,
      status: user.status,
    });
  }

  addUser(user: User): Observable<any> {
    return this.http.post<User>(this.apiUrl + '/add', user);
  }
}
