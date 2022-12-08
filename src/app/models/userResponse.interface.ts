import { Category } from 'src/app/models/category.interface';
import { Status } from 'src/app/models/status.interface';
import { User } from 'src/app/models/user.interface';

export interface UserResponse {
  statuses: Status[];
  users: User[];
  categories: Category[];
}
