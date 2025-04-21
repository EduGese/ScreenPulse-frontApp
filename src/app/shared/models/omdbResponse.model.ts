import { MediaItem } from './movie.model';

export interface OmdbResponse {
  Response: 'True' | 'False';
  Search?: MediaItem[];
  totalResults?: string;
  Error?: string;
}
