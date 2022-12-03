import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, Subscription, mergeMap, of } from 'rxjs';
import { Category } from 'src/app/models/category.interface';
import { Status } from 'src/app/models/status.interface';
import { statusResponse } from 'src/app/models/statusResponse.interface';
import { PopupComponent } from 'src/app/shared/popup/popup.component';
import { StatusService } from 'src/app/statuses/services/status.service';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss'],
})
export class StatusesComponent implements OnInit {
  statuses$!: Observable<statusResponse>;
  currentPage!: number;
  paramsSubscription!: Subscription;
  baseUrl!: string;

  displayedColumns: string[] = ['id', 'name'];

  constructor(
    private matDialog: MatDialog,
    private statusService: StatusService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params['page'] || '1');
        this.getstatuses();
      }
    );

    this.baseUrl = this.router.url.split('?')[0];
  }

  getstatuses(): void {
    this.statuses$ = this.statusService.getStatuses(this.currentPage);
  }

  removeStatus(category: Category) {
    this.statusService.removeStatus(category).subscribe(() => {
      this.getstatuses();
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
            return this.statusService.addStatus({ name: data });
          } else {
            return of();
          }
        })
      )
      .subscribe(() => {
        this.getstatuses();
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
            return this.statusService.updateStatus(updatedStatus);
          } else {
            return of();
          }
        })
      )
      .subscribe(() => {
        this.getstatuses();
      });
  }

  filter(event: KeyboardEvent) {
    // this.statuses = mockData.filter((category) =>
    //   category.name.includes((event.target as HTMLInputElement).value)
    // );
  }

  ngOnDestroy(): void {
    this.paramsSubscription && this.paramsSubscription.unsubscribe();
  }
}
