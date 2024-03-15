import { ToastrService } from 'ngx-toastr';
import { OmdbService } from 'src/app/shared/services/omdb/omdb.service';
import { Component } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';
import { FavoritesService } from 'src/app/shared/services/favorites/favorites.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  title: string ='';
  type: string = 'movie';
  year: string = '';
  results: Movie[] = [];


  types:any[] = [
    {value: 'movie', viewValue: 'Movie'},
    {value: 'series', viewValue: 'Serie'},
    {value: 'game', viewValue: 'Game'},
    {value: 'all', viewValue: 'All'}
  ];

 


  constructor(
    private OmdbService: OmdbService, 
    private toastrService: ToastrService, 
    private favoritesService: FavoritesService,
    private authService: AuthService,
    private router: Router,
    private dialogService: DialogService,
    ){}
  


  onSubmit(info: any){
    let {title, type, year} = info;
    type = type=== 'all' ? '' : type;

    if(title == '') {
      this.toastrService.error('Field Title required');
      return; 
    }

    if(year && !/^[0-9]{4}$/.test(year)) {
      this.toastrService.error('Year must be a 4 digit number');
      return; 
    }

    this.OmdbService.getMovies(title, type, year).subscribe({
      next:(response)=>{
        response && response.length>0 ? this.results = response || [] : this.toastrService.error('No results found', 'Search error')
        type = type == '' ? 'all' : type;
      },
      error:(error)=>{
        this.toastrService.error(error.message, 'Major error');
      }
  })
  }

  addToFavories(item: any) {
    if(!this.authService.isLoggedIn()){
      this.toastrService.error('You must be logged in to add movies to your list', 'Error');
      this.router.navigate(['/login']);
      return;
    }
    this.favoritesService.addToFavorites(item).subscribe({
      next:() => {
        this.toastrService.success(item.Title, 'Added to favorites');
      },
      error:(error) => {
        console.log(error);
        this.toastrService.error(error.error.message);
      }
     });
  }

  openMovie(movie:any){
    this.dialogService.openMovie(window.innerWidth,movie);
  }
}
