import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/users/services/user.service';

@Component({
  selector: 'app-user-datail',
  templateUrl: './user-datail.component.html',
  styleUrls: ['./user-datail.component.scss'],
})
export class UserDatailComponent implements OnInit {
  user!: User;
  id!: number;
  paramsSubscription!: Subscription;
  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.userService.getUser(this.id).subscribe((user) => {
      this.user = user;
    });
  }

  updateUser(user: User): void {
    this.userService.updateUser(user).subscribe((result) => {
      if (!result.error) {
        alert(
          `${user.firstName} ${user.lastName} has been successfully updated!`
        );
      }
    });
  }

  newUser(): void {
    this.router.navigate(['users', 'add']);
  }

  removeUser() {
    this.userService.removeUser(this.user).subscribe((result) => {
      if (!result.error) {
        alert(
          `${this.user.firstName} ${this.user.lastName} has been removed successfully!`
        );
        this.router.navigate(['users']);
      }
    });
  }
}
