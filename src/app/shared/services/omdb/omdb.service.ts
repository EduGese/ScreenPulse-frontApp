import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment.development';
import { OmdbResponse } from '../../models/omdbResponse.model';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  constructor(private http: HttpClient) { }

  getMovies(title:string, type:string, year:number):Observable<OmdbResponse>{
    return this.http.get<OmdbResponse>(environment.baseUrlOmdb, {
      params:{
        apikey: environment.apiKeyOmdb,
        s: title,
        type: type,
        y: year
      }
    })
    .pipe(

      catchError(error => {
  
        if (error.status === 404) {
          return throwError(() => new Error('EndpointNotFound')); 
        }
  
        if (error.status === 401) {
          return throwError(() => new Error('InvalidApiKey'));
        }
  
        return throwError(() => new Error('UnknownError'));
  
      })
  
    );
  }
}
