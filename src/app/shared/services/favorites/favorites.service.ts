import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { ErrorHandler, EventEmitter, Injectable } from '@angular/core';
import { MediaItem } from '../../models/movie.model';
import { environment } from 'src/environments/environment.development';
import { catchError, Observable, of, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

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
    console.log("Movie", movie)
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<MediaItem>(`${this.baseUrl}/${userId}`, movie, options)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = error.status === 409
            ? `"${movie.title}" is already in favorites`
            : 'Failed to add to favorites. Please try again later.';
          return throwError(() => new Error(errorMessage));
        }))
  }

  getFavorites(
    currentPage: number,
    pageSize: number,
    sortField?: string,
    sortOrder?: number,
    searchTerm?: string,
    mediaType?: string,
   ): Observable<any> {
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

      return this.http.get<MediaItem[]>(`${this.baseUrl}/${userId}`, {params});

  }
  deleteMediaItem(movieId: string): Observable<any> {
    const userId = this.authService.getUserId();
    return this.http.delete<any>(`${this.baseUrl}/${movieId}/${userId}`)
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
    return this.http.put<any>(`${this.baseUrl}/${mediaItem._id}/${userId}`, body, headers)
  }
}
