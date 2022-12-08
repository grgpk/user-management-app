import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { User } from 'src/app/models/user.interface';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe.class';
import { UserService } from 'src/app/users/services/user.service';

@Component({
  selector: 'app-user-datail',
  templateUrl: './user-datail.component.html',
  styleUrls: ['./user-datail.component.scss'],
})
export class UserDatailComponent extends Unsubscribe implements OnInit {
  user!: User;
  id!: number;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: Params) => {
        this.id = params['id'];
      });
    this.userService
      .getUser(this.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        this.user = user;
        this.isLoading = false;
      });
  }

  updateUser(user: User): void {
    this.userService
      .updateUser(user)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result) => {
          if (!result.error) {
            alert(
              `${user.firstName} ${user.lastName} has been successfully updated!`
            );
          }
        },
      });
  }

  removeUser() {
    this.userService
      .removeUser(this.user)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result) => {
          if (!result.error) {
            alert(
              `${this.user.firstName} ${this.user.lastName} has been removed successfully!`
            );
            this.router.navigate(['users']);
          }
        },
      });
  }
}
