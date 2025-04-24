import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment.development';
import { OmdbResponse } from '../../models/omdbResponse.model';
import { OmdbDetails } from '../../models/ombdDetails';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  constructor(private http: HttpClient) { }

  fetchMediaItems(title: string, type: string, year: string, page: number): Observable<OmdbResponse> {
    const options = {
      params: new HttpParams()
        .set('title', title.trim())
        .set('type', type)
        .set('year', year)
        .set('page', page.toString())
    };
    return this.http.get<OmdbResponse>(`${environment.serverSearchURL}`, options)
  }
  getMediaItemInfo(imdbId: string): Observable<OmdbDetails> {
    return this.http.get<OmdbDetails>(`${environment.serverSearchURL}/${imdbId}`)
  }
}
