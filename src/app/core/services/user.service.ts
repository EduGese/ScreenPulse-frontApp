import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment.development';
interface LoginResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.serverUserURL;

  constructor(private http: HttpClient) { }

  register(formData: User): Observable<User> {
    const body = formData;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<User>(`${this.baseUrl}/register`, body, httpOptions)
  }


  login(formData: User): Observable<LoginResponse> {
    const body = formData;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, body, httpOptions)

  }
}
