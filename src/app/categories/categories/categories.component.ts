import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { mergeMap, Observable, of, takeUntil } from 'rxjs';
import { CategoryService } from 'src/app/categories/services/category.service';

import { Category } from 'src/app/models/category.interface';
import { categoryResponse } from 'src/app/models/categoryResponse.interface';
import { PopupComponent } from 'src/app/shared/popup/popup.component';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe.class';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent
  extends Unsubscribe
  implements OnInit, OnDestroy
{
  categories$!: Observable<categoryResponse>;
  currentPage!: number;
  baseUrl!: string;
  displayedColumns: string[] = ['id', 'name'];

  constructor(
    private matDialog: MatDialog,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: Params) => {
        this.currentPage = Number(params['page'] || '1');
        this.categories$ = this.getCategories();
      });

    this.baseUrl = this.router.url.split('?')[0];
  }

  getCategories(): Observable<categoryResponse> {
    return this.categoryService.getCategories(this.currentPage);
  }

  removeCategory(category: Category) {
    this.categoryService
      .removeCategory(category)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.categories$ = this.getCategories();
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
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.categories$ = this.getCategories();
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
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.categories$ = this.getCategories();
      });
  }

  filter(event: KeyboardEvent) {
    this.categoryService.getFilterInput(
      (event.target as HTMLInputElement).value
    );
  }
}
