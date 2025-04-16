import { Movie } from './movie.model';

export type MediaType = 'movie' | 'series' | 'game' | 'all';

export interface SearchState {
  title: string;
  type: MediaType;
  year: string;
  currentPage: number;
  pageSize: number;
  collection: Movie[];
  collectionSize: number;
  searchOnProcess: boolean;
}

export interface SearchFilters {
  title: string;
  type: MediaType;
  year: string;
}