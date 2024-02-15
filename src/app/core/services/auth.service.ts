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
    this.userMailSubject.next(sessionStorage.getItem(this.userMailKey));
  }

  setAuthToken(token: string) {
    sessionStorage.setItem(this.authTokenKey, token);
  }

  getAuthToken(): string | null {
    return sessionStorage.getItem(this.authTokenKey);
  }


  isLoggedIn(): boolean {
    return !!this.getAuthToken();
  }

  setUserMail(userMail: string){
    sessionStorage.setItem(this.userMailKey, userMail);
    this.userMailSubject.next(userMail);
  }

  getUserMail(): string | null {
    return sessionStorage.getItem(this.userMailKey);
  }

  getUserMailObservable() {
    return this.userMailSubject.asObservable();
  }
  setUserName(userName: string){
    sessionStorage.setItem(this.userNameKey, userName);
  }
  getUserName(): string | null {
    return sessionStorage.getItem(this.userNameKey);
  }

  logOut(){
    sessionStorage.removeItem(this.authTokenKey);
    sessionStorage.removeItem(this.userMailKey);
    sessionStorage.removeItem(this.userNameKey);
    this.userMailSubject.next(null); 
  }
 
  
}
