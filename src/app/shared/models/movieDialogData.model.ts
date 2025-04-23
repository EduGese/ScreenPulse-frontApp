import { MediaItem } from "./movie.model";
import { OmdbDetails } from "./ombdDetails";

export interface MediaItemDialogData {
    movie: MediaItem;
    response: OmdbDetails; 
    fromFavoritesSection: boolean; 
  }