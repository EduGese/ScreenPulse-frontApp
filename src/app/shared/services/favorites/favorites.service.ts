import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { environment } from 'src/environments/environment.development';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private baseUrl = environment.serverFavoritesURL;
  favoriteDeleted = new EventEmitter<string>();
  favoriteUpdated = new EventEmitter<Movie>();
  constructor(private http: HttpClient) {}

  addToFavorites(movie: Movie): Observable<any> {
    const body = movie;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(this.baseUrl, body, httpOptions)
    .pipe(
      catchError((error) => {
        if (error.status === 404) {
          return throwError(() => new Error('EndpointNotFound'));
        }
        if (error.status === 400) {
          return throwError(() => new Error('Element duplicated'));
        }
        return throwError(() => new Error('UnknownError'));
      })
    );
  }

  getFavorites(): Observable<any> {
    return this.http.get<Movie[]>(this.baseUrl)
    .pipe(
      catchError((error) => {
        if (error.status === 404) {
          return throwError(() => new Error('EndpointNotFound'));
        }
        return throwError(() => new Error('UnknownError'));
      })
    );
  }
  deleteMovie(MovieId: string):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${MovieId}`)
    .pipe(
      catchError((error) => {
        if (error.status === 404) {
          return throwError(() => new Error('EndpointNotFound'));
        }
        return throwError(() => new Error('UnknownError'));
      })
    );
  }

  updateFavorite(movie: Movie): Observable<any> {
    const body = JSON.stringify(movie);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<any>(`${this.baseUrl}/${movie._id}`, body, httpOptions)
    .pipe(
      catchError((error) => {
        if (error.status === 404) {
          return throwError(() => new Error('EndpointNotFound'));
        }
        if (error.status === 400) {
                return throwError(() => new Error('Bad request'));
              }
        return throwError(() => new Error('UnknownError'));
      })
    );
  }
  


}
