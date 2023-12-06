import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-results-table',
  templateUrl: './movie-results-table.component.html',
  styleUrls: ['./movie-results-table.component.css']
})
export class MovieResultsTableComponent {
@Input () results:any;
displayedColumns: string[] = ['Title', 'Year', 'Type', 'IMDbId', 'Poster'];

}
