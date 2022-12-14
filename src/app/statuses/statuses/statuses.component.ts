import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, mergeMap, of, takeUntil } from 'rxjs';

import { Category } from 'src/app/models/category.interface';
import { Status } from 'src/app/models/status.interface';
import { statusResponse } from 'src/app/models/statusResponse.interface';
import { PopupComponent } from 'src/app/shared/popup/popup.component';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe.class';
import { StatusService } from 'src/app/statuses/services/status.service';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss'],
})
export class StatusesComponent extends Unsubscribe implements OnInit {
  statuses$!: Observable<statusResponse>;
  currentPage!: number;
  baseUrl!: string;
  displayedColumns: string[] = ['id', 'name'];
  isLoading: boolean = false;

  constructor(
    private matDialog: MatDialog,
    private statusService: StatusService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: Params) => {
        this.currentPage = Number(params['page'] || '1');
        this.getstatuses();
        this.isLoading = false;
      });

    this.baseUrl = this.router.url.split('?')[0];
  }

  getstatuses(): void {
    this.statuses$ = this.statusService.getStatuses(this.currentPage);
  }

  removeStatus(category: Category) {
    this.isLoading = true;
    this.statusService
      .removeStatus(category)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.getstatuses();
          this.isLoading = false;
        },
      });
  }

  addStatus(): void {
    this.matDialog
      .open(PopupComponent, {
        data: { page: 'status', type: 'add' },
      })
      .afterClosed()
      .pipe(
        mergeMap((data: string) => {
          if (data) {
            this.isLoading = true;
            return this.statusService.addStatus({ name: data });
          } else {
            return of();
          }
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: () => {
          this.getstatuses();
          this.isLoading = false;
        },
      });
  }

  updateStatus(status: Status): void {
    this.matDialog
      .open(PopupComponent, {
        data: { status, page: 'status', type: 'edit' },
      })
      .afterClosed()
      .pipe(
        mergeMap((updatedStatus: Category) => {
          if (updatedStatus) {
            this.isLoading = true;
            return this.statusService.updateStatus(updatedStatus);
          } else {
            return of();
          }
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: () => {
          this.getstatuses();
          this.isLoading = false;
        },
      });
  }

  filter(event: KeyboardEvent) {
    this.statusService.getFilterInput((event.target as HTMLInputElement).value);
  }
}
