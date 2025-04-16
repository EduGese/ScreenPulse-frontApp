import { Movie } from "./movie.model";

export interface MovieDialogData {
    movie: Movie;
    response: any; 
    fromFavoritesSection: boolean; 
  }