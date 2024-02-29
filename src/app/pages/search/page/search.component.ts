import { ToastrService } from 'ngx-toastr';
import { OmdbService } from 'src/app/shared/services/omdb/omdb.service';
import { Component } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';
import { TableColumn } from 'src/app/shared/models/tableColumn.model';
import { FavoritesService } from 'src/app/shared/services/favorites/favorites.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  title: string ='';
  type: string = 'movie';
  year: string = '';
  // results: Movie[] = [];
  results: Movie[] |Object[] = [
    {
      Title: "Rambo",
      Year: "2008",
      imdbID: "tt0462499",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BMTI5Mjg1MzM4NF5BMl5BanBnXkFtZTcwNTAyNzUzMw@@._V1_SX300.jpg"
  },
  {
      Title: "Rambo: First Blood Part II",
      Year: "1985",
      imdbID: "tt0089880",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BZWFkY2I1ZDAtNmZhNS00NjVlLWJiMGQtMGQ1ZmM0ZDA5ODg5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
  },
  {
      Title: "Rambo III",
      Year: "1988",
      imdbID: "tt0095956",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BOTIwNWJhZDItZmNmOC00M2NkLWIwNDktMTYwZWFlZDVkMmVkL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
  },
  {
      Title: "Rambo: Last Blood",
      Year: "2019",
      imdbID: "tt1206885",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BNTAxZWM2OTgtOTQzOC00ZTI5LTgyYjktZTRhYWM4YWQxNWI0XkEyXkFqcGdeQXVyMjMwNDgzNjc@._V1_SX300.jpg"
  },
  {
      Title: "Rambo",
      Year: "1986",
      imdbID: "tt0222619",
      Type: "series",
      Poster: "https://m.media-amazon.com/images/M/MV5BZDQ0M2M2MjktMmViYy00MDM5LWE1NWEtZmRhNzZmMGM3MzkxXkEyXkFqcGdeQXVyMjY3MjUzNDk@._V1_SX300.jpg"
  },
  {
      Title: "Arthur Rambo",
      Year: "2021",
      imdbID: "tt10951972",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BNzg5ZjJiNWEtNzhiZC00NzNhLThjZDgtZGU4OTMwN2I5YWY1XkEyXkFqcGdeQXVyNDgzNjg5Nw@@._V1_SX300.jpg"
  },
  {
      Title: "Rambo III",
      Year: "1989",
      imdbID: "tt0301766",
      Type: "game",
      Poster: "https://m.media-amazon.com/images/M/MV5BNDE3Y2NkODgtMzhmNi00M2M3LTgxMTAtNjBhNTJiOTdmZDIzXkEyXkFqcGdeQXVyMjY3MjUzNDk@._V1_SX300.jpg"
  },
  {
      Title: "Rambo: First Blood Part II",
      Year: "1986",
      imdbID: "tt0301768",
      Type: "game",
      Poster: "https://m.media-amazon.com/images/M/MV5BOWUzMDE1NTktMTU0OS00NTE3LWE2NzItMzA3MGM2NzdkYTJlXkEyXkFqcGdeQXVyMjY3MjUzNDk@._V1_SX300.jpg"
  },
  {
      Title: "Rambo",
      Year: "2012",
      imdbID: "tt3107798",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BNDUwOGYwYWUtZjMzNi00MDIwLWE2NjgtYTdhODJmMTQwMGMyXkEyXkFqcGdeQXVyMzQzMDc2MDk@._V1_SX300.jpg"
  },
  {
      Title: "Rambo",
      Year: "1987",
      imdbID: "tt0301765",
      Type: "game",
      Poster: "https://m.media-amazon.com/images/M/MV5BYmMxZGVjYzYtNWY4ZC00ZjAwLWFjNWQtOWFjNGEzNDQ2ZDM3XkEyXkFqcGdeQXVyMTgwOTE5NDk@._V1_SX300.jpg"
  }
  ];

  types:any[] = [
    {value: 'movie', viewValue: 'Movie'},
    {value: 'series', viewValue: 'Serie'},
    {value: 'game', viewValue: 'Game'},
    {value: 'all', viewValue: 'All'}
  ];

  columns: TableColumn[] = [
    { property: 'Title', header: 'Title' },
    { property: 'Year', header: 'Year'},
    { property: 'Type', header: 'Type'},
    { property: 'Poster', header: 'Poster'},
    { property: 'Add', header: 'Add'}
 ];


  constructor(
    private OmdbService: OmdbService, 
    private toastrService: ToastrService, 
    private favoritesService: FavoritesService,
    private authService: AuthService,
    private router: Router
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

    this.OmdbService.getMovies(title, type, year).subscribe(
      (response)=>{
        //Handdle responses with no movies
        console.log('Searched movies',response)
        response.Error ? this.toastrService.error(response.Error, 'Search error') : this.results = response.Search || [];// asign [] in case response is undefined
        type = type == '' ? 'all' : type;
      },
      (error)=>{
        //Handdle bad responses
        this.toastrService.error(error.message, 'Major error');
      }
    )
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
}
