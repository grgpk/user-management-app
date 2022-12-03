import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, mergeMap, Observable, of, Subscription } from 'rxjs';
import { CategoryService } from 'src/app/categories/services/category.service';

import { Category } from 'src/app/models/category.interface';
import { categoryResponse } from 'src/app/models/categoryResponse.interface';
import { PopupComponent } from 'src/app/shared/popup/popup.component';

const mockData = [
  { name: 'vip user', id: 1 },
  { name: 'idle user', id: 2 },
  { name: 'blocked user', id: 3 },
  { name: 'super user', id: 4 },
];

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories$!: Observable<categoryResponse>;
  currentPage!: number;
  paramsSubscription!: Subscription;
  baseUrl!: string;

  displayedColumns: string[] = ['id', 'name'];

  constructor(
    private matDialog: MatDialog,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params['page'] || '1');
        this.getCategories();
      }
    );

    this.baseUrl = this.router.url.split('?')[0];
  }

  getCategories(): void {
    this.categories$ = this.categoryService.getCategories(this.currentPage);
  }

  removeCategory(category: Category) {
    this.categoryService.removeCategory(category).subscribe(() => {
      this.getCategories();
    });
  }
  addCategory(): void {
    this.matDialog
      .open(PopupComponent, {
        data: { page: 'category', type: 'add' },
      })
      .afterClosed()
      .pipe(
        mergeMap((data: string) => {
          if (data) {
            return this.categoryService.addCategory({ name: data });
          } else {
            return of();
          }
        })
      )
      .subscribe(() => {
        this.getCategories();
      });
  }

  updateCategory(category: Category): void {
    this.matDialog
      .open(PopupComponent, {
        data: {
          category,
          page: 'category',
          type: 'edit',
        },
      })
      .afterClosed()
      .pipe(
        mergeMap((updatedCategory: Category) => {
          if (updatedCategory) {
            return this.categoryService.updateCategory(updatedCategory);
          } else {
            return of();
          }
        })
      )
      .subscribe(() => {
        this.getCategories();
      });
  }

  filter(event: KeyboardEvent) {
    // this.categories = mockData.filter((category) =>
    //   category.name.includes((event.target as HTMLInputElement).value)
    // );
  }

  ngOnDestroy(): void {
    this.paramsSubscription && this.paramsSubscription.unsubscribe();
  }
}
