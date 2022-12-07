import { User } from 'src/app/models/user.interface';

export interface UserResponse {
  total: number;
  users: User[];
  limit: number;
}
