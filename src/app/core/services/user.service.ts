import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.serverUserURL;

  constructor(private http: HttpClient) { }

register(formData: any): Observable<any>{//Crear interface user
  const body = formData;
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  return this.http.post<any>(`${this.baseUrl}/register`, body, httpOptions);
  
}
login(formData: any): Observable<any>{//Crear interface user
  const body = formData;
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  return this.http.post<any>(`${this.baseUrl}/login`, body, httpOptions);
  
}
}
