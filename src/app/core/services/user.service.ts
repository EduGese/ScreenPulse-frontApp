import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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
    console.log("Data en el servicio", body)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<User>(`${this.baseUrl}/register`, body, httpOptions).pipe(
      catchError((error) => {
        let errorMessage = 'An unknown error occurred.';
        let errorCode = '';

        if (error.status === 0) {
          errorMessage = 'There was a problem connecting to the server. Please check your internet connection or try again later.';
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
          errorCode = error.error.code;
        }
        return throwError(() => ({
          message: errorMessage,
          status: error.status,
          code: errorCode
        }));
      })
    );
  }


  login(formData: User): Observable<LoginResponse> {
    const body = formData;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, body, httpOptions).pipe(
      catchError((error) => {
        let errorMessage = 'An unknown error occurred.';
        let errorCode = '';
  
        if (error.status === 0) {
          errorMessage = 'There was a problem connecting to the server. Please check your internet connection or try again later.';
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
          errorCode = error.error.code;
        }
        return throwError(() => ({
          message: errorMessage,
          status: error.status,
          code: errorCode
        }));
      })
    );

  }
}
