
import { FavoritesService } from './../../../shared/services/favorites/favorites.service';
import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges } from '@angular/core';

import { Movie } from 'src/app/shared/models/movie.model';



@Component({
  selector: 'app-favorites-card',
  templateUrl: './favorites-card.component.html',
  styleUrls: ['./favorites-card.component.css'],
})
export class FavoritesCardComponent implements OnChanges{
  @Input() items!: any[];
  @Output() itemIdEvent = new EventEmitter<string>();

  //toggleMode = 'view';
  toggleModes: string[] = [];

  index: number = 0;

  constructor(
    private favoritesService: FavoritesService) {}

    // ngOnInit() {
    //   console.log('Items',this.items);
    //   if (this.items) {
    //      this.toggleModes = this.items.map(() => 'view');
    //      console.log('toggleModes',this.toggleModes);
    //   }
    // }
    ngOnChanges(changes: SimpleChanges) {
      if (changes['items'] && changes['items'].currentValue) {
        this.toggleModes = this.items.map(() => 'view');
      }
    }
    
    getId(i: number){
    this.index = i;
    }

  addDescription(movie: Movie, description: any, _id: string, i: number) {
    const movieUpdated = {
      _id: _id,
      Title: movie.Title,
      Year: movie.Year,
      imdbID: movie.imdbID,
      Type: movie.Type,
      Poster: movie.Poster,
      description: description,
    };
    this.favoritesService.updateFavorite(movieUpdated).subscribe(
      () => {
        console.log('Movie updated successfully');
      },
      (error) => {
        console.error(error);
      }
    );
    this.toggleModes[i] = 'view';
  }
  sendItemId(id: string) {//Sends Item id to parent component in order to be deleted from parent component
    this.itemIdEvent.emit(id);
  }
}
