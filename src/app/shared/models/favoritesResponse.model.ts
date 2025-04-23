import { MediaItem } from "./movie.model";

export interface FavoritesResponse {
    favorites: MediaItem[];
    totalFavorites: number;
    currentPage: number;
    pageSize: number;
  }
  