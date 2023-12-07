import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';


@Component({
  selector: 'app-movie-results-table',
  templateUrl: './movie-results-table.component.html',
  styleUrls: ['./movie-results-table.component.css']
})
export class MovieResultsTableComponent {
@Input () results!:Movie[];
displayedColumns: string[] = ['Title', 'Year', 'Type', 'IMDbId', 'Poster', 'Add'];

favorites: Movie[] = [];

constructor(){}

addToFavories(movie:Movie){
console.log(movie);
this.favorites.push(movie);
const favoritesString = JSON.stringify(this.favorites);

localStorage.setItem('favorites', favoritesString)

}

}


