import { Category } from './category.interface';

export interface categoryResponse {
  total: number;
  categories: Category[];
  limit: number;
}
