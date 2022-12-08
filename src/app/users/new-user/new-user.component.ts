import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { User } from 'src/app/models/user.interface';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe.class';
import { UserService } from 'src/app/users/services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent extends Unsubscribe {
  constructor(private userService: UserService, private router: Router) {
    super();
  }

  createUser(user: User): void {
    this.userService
      .addUser(user)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result) => {
          if (!result.error) {
            alert(
              `${user.firstName} ${user.lastName} has been created successfully!`
            );
            this.router.navigate(['users']);
          }
        },
      });
  }
}
