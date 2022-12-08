import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() total!: number;
  @Input() limit!: number;
  @Input() currentPage!: number;
  @Input() url!: string;

  pagesCount!: number;
  pages!: number[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.total / this.limit);
    this.pages = this.getRange(1, this.pagesCount);
    this.navigateToPreviousPage();
  }

  getRange(start: number, end: number): number[] {
    return [...Array(end).keys()].map((el) => el + start);
  }

  navigateToPreviousPage(): void {
    if (this.pagesCount < this.currentPage && this.currentPage > 1) {
      this.router.navigateByUrl(this.url + `?page=${this.currentPage - 1}`);
    }
  }
}
