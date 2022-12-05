import { Category } from 'src/app/models/category.interface';
import { Status } from 'src/app/models/status.interface';

export interface User {
  _id?: number;
  email: string;
  personalNumber: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  category: Category;
  status: Status;
}
