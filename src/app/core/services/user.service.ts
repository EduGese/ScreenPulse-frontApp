import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  } from 'rxjs';
import { LoginResponse, User } from 'src/app/shared/models/auth.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.serverUserURL;

  constructor(private http: HttpClient) { }

    login(formData: User): Observable<LoginResponse> {
    const body = formData;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, body, httpOptions)
  }

  register(formData: User): Observable<User> {
    const body = formData;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<User>(`${this.baseUrl}/register`, body, httpOptions)
  }



}
