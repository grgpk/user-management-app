import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';

import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/users/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  // dataSource!: User;
  // displayedColumns = this.columns.map(c => c.columnDef);
  users!: MatTableDataSource<User>;
  currentPage!: number;
  paramsSubscription!: Subscription;
  usersSubscription!: Subscription;
  baseUrl!: string;

  displayedColumns = [
    'Firstname',
    'Lastname',
    'Email',
    'Personal Number',
    'Birth Date',
    'Category',
    'Status',
    'Actions',
  ];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params['page'] || '1');
      }
    );

    this.usersSubscription = this.getUsers().subscribe((users) => {
      this.users = new MatTableDataSource(users);
    });

    this.baseUrl = this.router.url.split('?')[0];
  }

  getUsers(): Observable<User[]> {
    return this.userService.getUsers(this.currentPage);
  }

  onFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  goToDetails(id: number) {
    this.router.navigate([this.baseUrl, id]);
  }

  ngOnDestroy(): void {
    this.paramsSubscription && this.paramsSubscription.unsubscribe();
    this.usersSubscription && this.usersSubscription.unsubscribe();
  }
}
