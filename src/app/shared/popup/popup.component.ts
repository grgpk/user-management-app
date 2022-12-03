import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Category } from 'src/app/models/category.interface';
import { Status } from 'src/app/models/status.interface';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}
}
