import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { environment } from 'src/environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private baseUrl = environment.serverFavoritesURL;
  favoriteDeleted = new EventEmitter<string>();
  favoriteUpdated = new EventEmitter<Movie>();
  constructor(private http: HttpClient, private authService: AuthService) {}

  addToFavorites(movie: Movie): Observable<any> {
    const userId = this.authService.getUserId();
    const body = movie;
    console.log('body',body)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(`${this.baseUrl}/${userId}`, body, httpOptions);
  }

  getFavorites(): Observable<any> {
    const userId = this.authService.getUserId();
    console.log('userId',userId)
    return this.http.get<Movie[]>(`${this.baseUrl}/${userId}`)
  }
  deleteMovie(movieId: string):Observable<any>{
    const userId = this.authService.getUserId();
    return this.http.delete<any>(`${this.baseUrl}/${movieId}/${userId}`)
  }

  updateFavorite(movie: Movie): Observable<any> {
    const userId = this.authService.getUserId();
    const body = movie;
    console.log('body', body )
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<any>(`${this.baseUrl}/${movie._id}/${userId}`, body, httpOptions)
  }
  


}
