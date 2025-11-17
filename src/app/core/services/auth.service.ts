import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser } from 'src/app/shared/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authTokenKey = 'authToken';
  private readonly userMailKey = 'userMail';
  private readonly userNameKey = 'userName';
  private readonly userIdKey = 'userId';

  private userMailSubject = new BehaviorSubject<string | null>(null);
  private userLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    this.userMailSubject.next(sessionStorage.getItem(this.userMailKey));
    this.userLoggedInSubject.next(sessionStorage.getItem(this.authTokenKey) !== null);
  }
  setUserSession(user: AuthUser, token: string) {
    this.setAuthToken(token);
    this.setUserMail(user.email);
    this.setUserName(user.name);
  }

  setAuthToken(token: string) {
    sessionStorage.setItem(this.authTokenKey, token);
    this.userLoggedInSubject.next(true);
  }

  getAuthToken(): string | null {
    return sessionStorage.getItem(this.authTokenKey);
  }

  isLoggedInObservable(): Observable<boolean> {
    return this.userLoggedInSubject.asObservable();
  }

  setUserMail(userMail: string) {
    sessionStorage.setItem(this.userMailKey, userMail);
    this.userMailSubject.next(userMail);
  }

  getUserMail(): string | null {
    return sessionStorage.getItem(this.userMailKey);
  }

  getUserMailObservable() {
    return this.userMailSubject.asObservable();
  }

  setUserName(userName: string) {
    sessionStorage.setItem(this.userNameKey, userName);
  }

  getUserName(): string | null {
    return sessionStorage.getItem(this.userNameKey);
  }

  logOut() {
    sessionStorage.removeItem(this.authTokenKey);
    sessionStorage.removeItem(this.userMailKey);
    sessionStorage.removeItem(this.userNameKey);
    sessionStorage.removeItem(this.userIdKey);
    this.userMailSubject.next(null);
    this.userLoggedInSubject.next(false);
  }
}
