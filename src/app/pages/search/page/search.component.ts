import { ToastrService } from 'ngx-toastr';
import { OmdbService } from 'src/app/shared/services/omdb/omdb.service';
import { Component, ViewChild } from '@angular/core';
import { MediaItem } from 'src/app/shared/models/movie.model';
import { SearchState, SearchFilters } from 'src/app/shared/models/search.model';
import { FavoritesService } from 'src/app/shared/services/favorites/favorites.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { FEATURED_MEDIA } from 'src/app/core/constants/featured-media.const';
import { EMPTY, finalize, switchMap, take } from 'rxjs';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})


export class SearchComponent {
  featuredMedia: MediaItem[] = FEATURED_MEDIA;
  displayedColumns: string[] = ['title', 'year', 'type', 'poster', 'Add'];
  searchState: SearchState = {
    title: '',
    type: 'all',
    year: '',
    currentPage: 1,
    pageSize: 10,
    collection: [],
    collectionSize: 0,
    searchOnProcess: false,
  };
  loadingCard = false;

  @ViewChild(SearchBarComponent) SearchComponent!: SearchBarComponent | null;

  constructor(
    private omdbService: OmdbService,
    private toastrService: ToastrService,
    private favoritesService: FavoritesService,
    private authService: AuthService,
    private router: Router,
    private dialogService: DialogService
  ) { }


  onSubmit(filters: SearchFilters): void {
    this.searchState = {
      ...this.searchState,
      ...filters,
      currentPage: 1,
      searchOnProcess: true
    };
    this.fetchMediaItems();
  }

  loadPage(page: number): void {
    this.searchState.currentPage = page;
    this.fetchMediaItems();
  }

addToFavorites(mediaItem: MediaItem) {
  this.authService.isLoggedInObservable().pipe(
    take(1),
    switchMap(loggedIn => {
      if (!loggedIn) {
        this.toastrService.error('You must be logged in to add movies to your list', 'Error');
        this.router.navigate(['/login']);
        return EMPTY; 
      }
      return this.favoritesService.addToFavorites(mediaItem);
    })
  ).subscribe({
    next: () => this.toastrService.success(mediaItem.title, 'Added to favorites'),
    error: (error) => this.toastrService.warning(error.message)
  });
}


  openMediaItem(mediaItem: MediaItem): void {
    this.loadingCard = true;
    this.dialogService
      .openMediaItem(window.innerWidth, mediaItem, false)
      .pipe(finalize(() => (this.loadingCard = false)))
      .subscribe();
  }

  formSearchFocus(): void {
    setTimeout(() => {
      this.SearchComponent?.searchFormFocus?.nativeElement.focus();
    });
  }


  private fetchMediaItems(): void {
    this.omdbService.fetchMediaItems(
      this.searchState.title,
      this.searchState.type,
      this.searchState.year,
      this.searchState.currentPage)
      .subscribe({
        next: (response) => {
          if (response.Response === "True") {
            this.searchState.collection = response.Search || [];
            this.searchState.collectionSize = Number(response.totalResults) || 0;
            this.focusOnResultsTable()
          } else {
            this.toastrService.warning(response.Error, 'Try again!');
            this.searchState.collection = [];
          }
          this.searchState.searchOnProcess = false;
        },
        error: (error) => {
          this.toastrService.error(error.message);
          this.searchState.searchOnProcess = false;
        }
      })
  }

  private focusOnResultsTable(): void {
    setTimeout(() => {
      document.getElementById('tableFocus')?.focus();
    });
  }
}
