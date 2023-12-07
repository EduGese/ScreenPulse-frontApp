import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';

@Component({
  selector: 'app-favorites-card',
  templateUrl: './favorites-card.component.html',
  styleUrls: ['./favorites-card.component.css']
})
export class FavoritesCardComponent {
  @Input () favorites!:Movie[];
}
