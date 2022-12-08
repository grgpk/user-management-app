import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Category } from 'src/app/models/category.interface';
import { Status } from 'src/app/models/status.interface';
import { UserService } from 'src/app/users/services/user.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Output() userUpdateEvent = new EventEmitter<User>();
  @Output() userCreateEvent = new EventEmitter<User>();

  @Input() formType!: 'edit' | 'create';
  @Input() user!: User;

  options$:
    | Observable<{ statuses: Status[]; categories: Category[] }>
    | undefined;

  userForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    personalNumber: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    status: ['', [Validators.required]],
    category: ['', [Validators.required]],
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.user && this.formType === 'edit') {
      const user: User = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        personalNumber: this.user.personalNumber,
        status: this.user.status,
        category: this.user.category,
        birthDate: this.user.birthDate,
      };
      this.userForm.setValue(user);
    }

    this.options$ = this.userService.getStatusesAndCategories();
  }

  updateUser() {
    const updatedUser: User = {
      ...this.userForm.value,
      _id: this.user._id,
    };
    this.userUpdateEvent.emit(updatedUser);
  }

  createUser() {
    this.userCreateEvent.emit(this.userForm.value);
  }
}
