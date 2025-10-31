import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private toastService: ToastrService) { }

  canActivate(): Observable<boolean> {
    
    return this.authService.isLoggedInObservable().pipe(
      take(1),
      tap(loggedIn => {
        if (!loggedIn) {
          this.toastService.warning('You must be logged in to access this page.', 'Access Denied');
          this.router.navigate(['/auth/login']);
        }
      })
    );
  }
}
