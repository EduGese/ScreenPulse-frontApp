import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/shared/models/movie.model';
import { TableColumn } from 'src/app/shared/models/tableColumn.model';
import { FavoritesService } from 'src/app/shared/services/favorites/favorites.service';

@Component({
  selector: 'app-movie-results-table',
  templateUrl: './movie-results-table.component.html',
  styleUrls: ['./movie-results-table.component.css'],
})
export class MovieResultsTableComponent implements OnInit {
  @Input() results!: Movie[];
  @Input() columns: TableColumn[] = [];
  displayedColumns: string[] = [];

  constructor(
    private toastrService: ToastrService,
    private favoritesService: FavoritesService
  ) {}
  ngOnInit(): void {
    this.columns.forEach((element) => {
      this.displayedColumns.push(element.header);
    });
  }

  isAnImage(property: string): boolean {
    if (property.endsWith('.jpg') || property === 'N/A') {
      return true;
    } else console.log(property);
    return false;
  }
  addToFavories(movie: Movie) {
    this.favoritesService.addToFavorites(movie).subscribe(
      () => {
        this.toastrService.success(movie.Title, 'Added to favorites');
      },
      (error) => {
        console.error('Error:', error);
        if (error.message === 'Element duplicated') {
          this.toastrService.error(movie.Title, 'It is already in your list');
        }
      }
    );
  }
}
