import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authTokenKey  = 'authToken';
  private userMailKey = 'userMail';
  private userNameKey = 'userName';
  private userIdKey = 'userId';

  private userMailSubject = new BehaviorSubject<string | null>(null);

  constructor() { 
    this.userMailSubject.next(sessionStorage.getItem(this.userMailKey));
  }
  setUserSession(user: User, token: string) {
  this.setAuthToken(token);
  this.setUserMail(user.email);
  this.setUserName(user.name ? user.name : '');
  this.setUserId(user._id ? user._id : '');
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
  setUserId(userId: string){//ELIMINAR
    sessionStorage.setItem(this.userIdKey, userId);
  }
  getUserId(): string | null {//ELIMINAR
    return sessionStorage.getItem(this.userIdKey);
  }

  logOut(){
    sessionStorage.removeItem(this.authTokenKey);
    sessionStorage.removeItem(this.userMailKey);
    sessionStorage.removeItem(this.userNameKey);
    sessionStorage.removeItem(this.userIdKey);
    this.userMailSubject.next(null); 
  }
}
