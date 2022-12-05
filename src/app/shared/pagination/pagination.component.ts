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
    this.pages = [...Array(this.pagesCount).keys()].map((el) => el + 1);
    this.navigateToPreviousPage();
  }

  navigateToPreviousPage(): void {
    if (this.pagesCount < this.currentPage) {
      this.router.navigateByUrl(this.url + `?page=${this.currentPage - 1}`);
    }
  }
}
