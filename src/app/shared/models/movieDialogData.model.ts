import { MediaItem } from "./movie.model";

export interface MediaItemDialogData {
    movie: MediaItem;
    response: any; 
    fromFavoritesSection: boolean; 
  }