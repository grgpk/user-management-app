import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/users/services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnDestroy {
  userSubscription!: Subscription;
  constructor(private userService: UserService, private router: Router) {}

  createUser(user: User): void {
    this.userSubscription = this.userService
      .addUser(user)
      .subscribe((result) => {
        if (!result.error) {
          alert(
            `${user.firstName} ${user.lastName} has been created successfully!`
          );
          this.router.navigate(['users']);
        }
      });
  }

  ngOnDestroy(): void {
    this.userSubscription && this.userSubscription.unsubscribe();
  }
}
