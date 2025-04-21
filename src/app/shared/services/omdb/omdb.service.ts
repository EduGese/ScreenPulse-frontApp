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
    const options = {
      params: new HttpParams()
        .set('title', title.trim())
        .set('type', type)
        .set('year', year)
        .set('page', page.toString())
    };
    return this.http.get<OmdbResponse>(`${environment.serverSearchURL}`, options)
    .pipe(
      catchError(error => {
        console.log(error);
        if (error.status === 404) {
          return throwError(() => new Error('App error, contact service please')); 
        }
        return throwError(() => new Error('UnknownError'));
      })
    );
  }
  getMediaItemInfo(imdbId:string){
    return this.http.get<OmdbResponse>(`${environment.serverSearchURL}/${imdbId}`, {
    });
  }
}
