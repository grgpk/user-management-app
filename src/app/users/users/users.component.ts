import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, takeUntil } from 'rxjs';

import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/users/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe.class';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent extends Unsubscribe implements OnInit, OnDestroy {
  users = new MatTableDataSource<User>();
  currentPage!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = [
    'Firstname',
    'Lastname',
    'Email',
    'Personal Number',
    'Birth Date',
    'Category',
    'Status',
    'Details',
  ];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: Params) => {
        this.currentPage = Number(params['page'] || '1');
      });

    this.getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((users) => {
        this.users.data = users;
        this.users.paginator = this.paginator;
      });
  }

  getUsers(): Observable<User[]> {
    return this.userService.getUsers(this.currentPage);
  }

  onFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  goToDetails(id: number) {
    this.router.navigate(['users', id]);
  }
}
