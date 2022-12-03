import { Status } from 'src/app/models/status.interface';

export interface statusResponse {
  total: number;
  statuses: Status[];
  limit: number;
}
