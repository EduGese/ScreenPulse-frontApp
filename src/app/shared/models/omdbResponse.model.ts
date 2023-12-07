import { Movie } from './movie.model';

export interface OmdbResponse {
  Response: 'True' | 'False';
  Search?: Movie[];
  totalResults?: string;
  Error?: string;
}
