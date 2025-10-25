import { Component, EventEmitter, Input, Output, AfterViewInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MediaItem } from 'src/app/shared/models/movie.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

/**
 * 
 * Displays a **Material Design styled table** for listing media items such as movies, series, or videogames.
 * 
 * ## Features
 * 
 * - 📋 Displays columns for **title**, **year**, **type**, **poster**, and an add favorite button
 * - 🔄 Supports **sorting** and **pagination** using MatSort and MatPaginator
 * - 🎯 Emits events on favorite item addition, item detail opening, and page changes
 * - 📱 Responsive styles for images and layout on smaller screens
 * 
 * ## Key Capabilities
 * 
 * The component provides a fully interactive table with:
 * - **Client-side sorting** on all columns (title, year, type)
 * - **Server-side pagination** support with page change events
 * - **Clickable poster images** that trigger detail views
 * - **Favorite button** for each item with Material icon
 * 
 */
@Component({
  selector: 'app-movie-results-table',
  templateUrl: './movie-results-table.component.html',
  styleUrls: ['./movie-results-table.component.scss'],
})
export class MediaItemResultsTableComponent implements AfterViewInit, OnChanges {

  /** Data collection to be shown in the table */
  @Input() collection: MediaItem[] = [];

  /** Total items count, used for paginator length */
  @Input() collectionSize = 0;

  /** Current page index (starting at 1) */
  @Input() currentPage = 1;

  /** Number of rows per page */
  @Input() pageSize = 10;

  /** List of visible columns in the table */
  @Input() displayedColumns: string[] = [];

  /** Emits when user adds an item to favorites */
  @Output() favoriteAdded = new EventEmitter<MediaItem>();

  /** Emits when user opens details for an item */
  @Output() detailsOpened = new EventEmitter<MediaItem>();

  /** Emits when user changes paginator page */
  @Output() pageChanged = new EventEmitter<number>();

  /** MatTableDataSource used internally by the Material table */
  dataSource = new MatTableDataSource<MediaItem>();

  /** Reference to the Angular Material Sort directive */
  @ViewChild(MatSort) sort!: MatSort;

  /** Reference to the Angular Material Paginator directive */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /*
  * Lifecycle hook: called when input properties change
  * @param changes - Object containing the changed properties
  * 
  * Updates the data source when the collection input changes
  * Resets paginator to first page if currentPage input is set to 1
  */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['collection']?.currentValue) {
      this.dataSource.data = changes['collection'].currentValue || [];
    }
    if (changes['currentPage']?.currentValue === 1 && this.paginator) {
      this.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** User clicks on “add to favorites” button */
  onFavoriteAdded(item: MediaItem) {
    this.favoriteAdded.emit(item);
  }

  /** User clicks or navigates to open details */
  onDetailsOpened(item: MediaItem) {
    this.detailsOpened.emit(item);
  }

  /** User changes paginator page */
  onPageChanged(event: PageEvent) {
    const pageNumber = event.pageIndex + 1;
    this.pageChanged.emit(pageNumber);
  }
}
