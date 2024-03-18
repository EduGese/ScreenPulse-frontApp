import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.serverUserURL;

  constructor(private http: HttpClient) { }

register(formData: User): Observable<any>{
  const body = formData;
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  return this.http.post<any>(`${this.baseUrl}/register`, body, httpOptions);
  
}
login(formData: User): Observable<any>{
  const body = formData;
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  return this.http.post<any>(`${this.baseUrl}/login`, body, httpOptions);
  
}
}
