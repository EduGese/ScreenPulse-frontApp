import { ToastrService } from 'ngx-toastr';
import { OmdbService } from 'src/app/shared/services/omdb/omdb.service';
import { Component, ViewChild } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';
import { SearchState, SearchFilters } from 'src/app/shared/models/search.model';
import { FavoritesService } from 'src/app/shared/services/favorites/favorites.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { SearchBarComponent } from 'src/app/shared/components/search-bar/search-bar.component';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent {
searchState: SearchState = {
  title: '',
  type: 'all',
  year: '',
  currentPage: 1,
  pageSize: 10,
  collection: [],
  collectionSize: 0,
  searchOnProcess: false
};
displayedColumns: string[] = ['Title', 'Year', 'Type', 'Poster', 'Add'];

 /*Focus*/ 
   @ViewChild(SearchBarComponent)
  SearchComponent!: SearchBarComponent | null;

  constructor(
    private OmdbService: OmdbService, 
    private toastrService: ToastrService, 
    private favoritesService: FavoritesService,
    private authService: AuthService,
    private router: Router,
    private dialogService: DialogService
    ){}

    
  formSearchFocus() {
    setTimeout(() => {
        this.SearchComponent?.searchFormFocus?.nativeElement.focus();
    });
  }

  onSubmit(filters: SearchFilters) {
    this.searchState = {
      ...this.searchState,
      ...filters,
      currentPage: 1,
      searchOnProcess: true
    };
    this.fetchMediaItems();
  }
  loadPage(page: number) {
    this.searchState.currentPage = page;
    this.fetchMediaItems();
  }
  private fetchMediaItems() {
    this.OmdbService.fetchMediaItems(
      this.searchState.title,
      this.searchState.type, 
      this.searchState.year, 
      this.searchState.currentPage)
      .subscribe({
      next:(response)=>{
        if(response.Response === "True"){
          this.searchState.collection = response.Search || [];
          this.searchState.collectionSize = Number(response.totalResults) || 0;
          setTimeout(() => {
            document.getElementById('tableFocus')?.focus();
          });
        }else{
          this.toastrService.warning('Try another search', 'No results found');
          this.searchState.collection = [];
        }
        this.searchState.searchOnProcess = false;
      },
      error:(error)=>{
        this.toastrService.error(error.message, 'Major error');
      }
  })
  }

  addToFavories(mediaItem: Movie) {
    if(!this.authService.isLoggedIn()){
      this.toastrService.error('You must be logged in to add movies to your list');
      this.router.navigate(['/login']);
      return;
    }
    
    this.favoritesService.addToFavorites(mediaItem).subscribe({
      next:() => {
        this.toastrService.success(mediaItem.Title, 'Added to favorites');
      },
      error:(error: HttpErrorResponse) => {
        this.toastrService.error(error.message, 'Error adding to favorites');
      }
     });
  }
  

  openMovie(movie: Movie) {
    this.dialogService.openMovie(window.innerWidth,movie, false);
  }
}
