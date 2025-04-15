import { Movie } from 'src/app/shared/models/movie.model';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-movie-results-table',
  templateUrl: './movie-results-table.component.html',
  styleUrls: ['./movie-results-table.component.css'],
})
export class MovieResultsTableComponent implements AfterViewInit, OnChanges {
  @Input() collection!: Movie[];
  @Input() collectionSize!: number;
  @Input() currentPage!: number;
  @Input() pageSize!: number;
  @Input() displayedColumns!: string[];

  @Output() favoriteAdded  = new EventEmitter<Movie>();
  @Output() detailsOpened  = new EventEmitter<Movie>();
  @Output() pageChanged = new EventEmitter<number>();


  dataSource = new MatTableDataSource<Movie>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() { }


  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['collection']?.currentValue) {
      this.dataSource.data = changes['collection'].currentValue || [];
    }
    if (changes['currentPage']?.currentValue === 1 && this.paginator) {
      this.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onFavoriteAdded(item: Movie) {
    this.favoriteAdded .emit(item);
  }

  onDetailsOpened(item: Movie) {
    this.detailsOpened .emit(item);
  }

  onPageChanged(event: PageEvent) {
    const pageNumber = event.pageIndex + 1;
    this.pageChanged.emit(pageNumber);
  }
}
