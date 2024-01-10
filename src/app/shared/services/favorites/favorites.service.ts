import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { environment } from 'src/environments/environment.development';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favoriteDeleted = new EventEmitter<string>();
  constructor(private http: HttpClient) {}

  addToFavorites(movie: Movie): Observable<any> {
    const body = movie;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(environment.serverURL, body, httpOptions)
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
    return this.http.get<Movie[]>(environment.serverURL)
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
    return this.http.delete<any>(`${environment.serverURL}/${MovieId}`)
    .pipe(
      tap({
        next: () => {
          this.favoriteDeleted.emit(MovieId);
        },
        error: (error) => {
          if (error.status === 404) {
            throw new Error('EndpointNotFound');
          } else {
            throw new Error('UnknownError');
          }
        }
      })
    );
  }
  


}
