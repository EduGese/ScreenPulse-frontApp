import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment.development';
import { Movie } from '../../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  constructor(private http: HttpClient) { }

  getMovies(title:string, type:string, year:string):Observable<Movie[]>{
    const body = {
      s: title.trim(),
      type: type,
      y: year,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(environment.serverSearchURL, body, httpOptions)
    .pipe(

      catchError(error => {
  
        if (error.status === 404) {
          return throwError(() => new Error('EndpointNotFound')); 
        }
        return throwError(() => new Error('UnknownError'));
  
      })
  
    );
  }
  getMovieInfo(imdbId:string){
    
    return this.http.get<any>(`${environment.serverSearchURL}/${imdbId}`, {
    });
  }
}
