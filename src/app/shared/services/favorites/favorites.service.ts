import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MediaItem } from '../../models/movie.model';
import { environment } from 'src/environments/environment.development';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { DeleteResponse } from '../../models/deleteResponse.model';
import { FavoritesResponse } from '../../models/favoritesResponse.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private baseUrl = environment.serverFavoritesURL;
  favoriteDeleted = new EventEmitter<string>();
  favoriteUpdated = new EventEmitter<MediaItem>();
  constructor(private http: HttpClient, private authService: AuthService) { }

  addToFavorites(movie: MediaItem): Observable<MediaItem> {
    const userId = this.authService.getUserId();
    if (!userId) {
      return throwError(() => new Error('User ID not available'));
    }
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<MediaItem>(`${this.baseUrl}/${userId}`, movie, options)
  }

  getFavorites(
    currentPage: number,
    pageSize: number,
    sortField?: string,
    sortOrder?: number,
    searchTerm?: string,
    mediaType?: string,
   ): Observable<FavoritesResponse> {
    const userId = this.authService.getUserId();
    if (!userId) return of({
      favorites: [],
      totalFavorites: 0,
      currentPage,
      pageSize
    });
    
    let params = new HttpParams()
      .set('page', currentPage.toString())
      .set('pageSize', pageSize.toString());
    if (sortField) params = params.set('sortField', sortField);
    if (sortOrder) params = params.set('sortOrder', sortOrder.toString());
    if (mediaType && mediaType !== 'all') params = params.set('type', mediaType);
    if (searchTerm) params = params.set('searchTerm', searchTerm);
      return this.http.get<FavoritesResponse>(`${this.baseUrl}/${userId}`, {params});

  }
  deleteMediaItem(movieId: string): Observable<DeleteResponse> {
    const userId = this.authService.getUserId();
    return this.http.delete<DeleteResponse>(`${this.baseUrl}/${movieId}/${userId}`);
  }

  updateFavorite(mediaItem: MediaItem): Observable<MediaItem> {
    const userId = this.authService.getUserId();
    const body = {
      description: mediaItem.description
    }
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.patch<MediaItem>(`${this.baseUrl}/${mediaItem._id}/${userId}`, body, headers)
  }
}
