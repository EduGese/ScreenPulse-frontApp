import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';
import { StorageService } from 'src/app/shared/services/storage/storage.service';


@Component({
  selector: 'app-movie-results-table',
  templateUrl: './movie-results-table.component.html',
  styleUrls: ['./movie-results-table.component.css']
})
export class MovieResultsTableComponent {
@Input () results!:Movie[];
displayedColumns: string[] = ['Title', 'Year', 'Type', 'IMDbId', 'Poster', 'Add'];



constructor(private storageService: StorageService){}


addToFavories(movie:Movie){
this.storageService.addToFavories(movie);

}


}


