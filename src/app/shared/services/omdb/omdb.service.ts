import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment.development';
import { OmdbResponse } from '../../models/omdbResponse.model';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  constructor(private http: HttpClient) { }

  fetchMediaItems(title:string, type:string, year:string, page:number):Observable<OmdbResponse>{
    const httpOptions = {
      params: new HttpParams()
        .set('title', title.trim())
        .set('type', type)
        .set('year', year)
        .set('page', page.toString())
    };
    return this.http.get<OmdbResponse>(environment.serverSearchURL, httpOptions)
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
