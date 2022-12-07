import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.interface';
import { Status } from 'src/app/models/status.interface';

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

  statuses$!: Observable<Status[]>;
  categories$!: Observable<Category[]>;

  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  personalNumber = new FormControl('', [Validators.required]);
  birthDate = new FormControl('', [Validators.required]);
  status = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);

  userForm = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    personalNumber: this.personalNumber,
    birthDate: this.birthDate,
    status: this.status,
    category: this.category,
  });

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

    if(this.formType === 'create') {
      this.statuses$
    }
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
