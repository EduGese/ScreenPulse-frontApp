import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MediaItem } from 'src/app/shared/models/movie.model';
import { FavoritesFilterService } from '../services/favoritesFilterService/favorites-filter.service';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from 'src/app/shared/services/favorites/favorites.service';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { AuthService } from 'src/app/core/services/auth.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FavoritesSearchParams } from 'src/app/shared/models/favoritesSearchParams.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favorites: MediaItem[] | [] = [];
  favoritesSize: number = 0;
  isLoadingFavorites: boolean = false;
  userName: string | null = '';

  searchParams: FavoritesSearchParams = {
    currentPage: 1,
    pageSize: 10,
    sortField: undefined,
    mediaType: undefined,
    sortOrder: undefined,
    searchTerm: undefined,
  };
  isRevalidatingAfterDelete: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private toastrService: ToastrService,
    private favoritesService: FavoritesService,
    private authService: AuthService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.isLoadingFavorites = true;
    this.loadAllFavorites();
    this.userName = this.authService.getUserName();
  }


  onPageChanged(event: PageEvent): void {
    this.searchParams.currentPage = event.pageIndex + 1;
    this.loadAllFavorites();
  }

  loadAllFavorites(): void {
    this.favoritesService.getFavorites(
      this.searchParams.currentPage,
      this.searchParams.pageSize,
      this.searchParams.sortField,
      this.searchParams.sortOrder,
      this.searchParams.searchTerm,
      this.searchParams.mediaType
    ).subscribe({
      next: (response) => {
        this.favorites = response.favorites;
        this.favoritesSize = response.totalFavorites;
        this.isLoadingFavorites = false;
        this.isRevalidatingAfterDelete = false;
      },
      error: (error) => {
        console.error(error);
        this.toastrService.error('Cannot load favorites, try again later');
        this.isLoadingFavorites = false;
      },
    });
  }
  onMediaTypeChange(mediaType:string): void {
    this.searchParams.mediaType = mediaType;
    this.searchParams.currentPage = 1;
    this.loadAllFavorites();
  }

  onSort(event: { field: string, order: number }): void {
    this.searchParams.sortField = event.field;
    this.searchParams.sortOrder = event.order;
    this.searchParams.currentPage = 1;
    this.loadAllFavorites();
  }

  onFilter(searchTerm: string): void {
    this.searchParams.searchTerm = searchTerm;
    this.searchParams.currentPage = 1;
    this.loadAllFavorites();
  }

  openFavorite(favoriteMediaItemToOpen: MediaItem): void {
    this.dialogService.openMediaItem(window.innerWidth, favoriteMediaItemToOpen, true);
  }

  deleteFavorite(_id: string): void {
    this.favoritesService.deleteMediaItem(_id).subscribe({
      next: () => {
        this.favorites = this.favorites.filter((movie) => movie._id != _id);
         if (this.favorites.length === 0) {
          this.isLoadingFavorites = true;
          this.isRevalidatingAfterDelete = true;
          this.searchParams.currentPage = 1;
          this.loadAllFavorites();
        }
        this.toastrService.success('Item deleted');
      },
      error: () => {
        this.toastrService.error('Cannot delete item, try again later');
      },
    });
  }

  updateFavorite(mediaItem: MediaItem): void {
    this.favoritesService.updateFavorite(mediaItem)
      .subscribe({
        next: (updatedMediaItem) => {
          this.favorites = this.favorites.map(movie =>
            movie._id === updatedMediaItem._id ? { ...movie, description: updatedMediaItem.description } : movie
          );
          this.toastrService.success('Item updated');
        },
        error: () => {
          this.toastrService.error('Cannot update item, try again later');
        },
      });
  }

  trackByFn(index: number, item: MediaItem): string {
    return item.imdbID;
  }
}

