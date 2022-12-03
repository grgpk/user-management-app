import { Component, Input, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.total / this.limit);
    this.pages = [...Array(this.pagesCount).keys()].map((el) => el + 1);
  }
}
