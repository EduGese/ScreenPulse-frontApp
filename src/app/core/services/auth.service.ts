import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authTokenKey: string  = 'authToken';
  private userMailKey: string = 'userMail';
  private userNameKey: string = 'userName';

  private userMailSubject = new BehaviorSubject<string | null>(null);

  constructor() { 
    this.userMailSubject.next(localStorage.getItem(this.userMailKey));
  }

  setAuthToken(token: string) {
    localStorage.setItem(this.authTokenKey, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }


  isLoggedIn(): boolean {
    return !!this.getAuthToken();
  }

  setUserMail(userMail: string){
    localStorage.setItem(this.userMailKey, userMail);
    this.userMailSubject.next(userMail);
  }

  getUserMail(): string | null {
    return localStorage.getItem(this.userMailKey);
  }

  getUserMailObservable() {
    return this.userMailSubject.asObservable();
  }
  setUserName(userName: string){
    localStorage.setItem(this.userNameKey, userName);
  }
  getUserName(): string | null {
    return localStorage.getItem(this.userNameKey);
  }

  logOut(){
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.userMailKey);
    localStorage.removeItem(this.userNameKey);
    this.userMailSubject.next(null); 
  }
 
  
}
