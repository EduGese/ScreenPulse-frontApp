import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  constructor(private http: HttpClient) { }

  getMovies(title:string, type:string, year:string):Observable<any>{
    return this.http.get<any>(environment.baseUrlOmdb, {
      params:{
        apikey: environment.apiKeyOmdb,
        s: title,
        type: type,
        y: year
      }
    })
  }
}
