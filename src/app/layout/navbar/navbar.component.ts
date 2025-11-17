import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { combineLatest, Observable } from 'rxjs';
import { UserSessionData } from 'src/app/shared/models/user-session.model';

/**
 * 
 * Global navigation bar component with authentication state management and responsive design.
 * 
 * 
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  expanded = false;
  readonly userData$ : Observable<UserSessionData> = combineLatest({
  email: this.authService.getUserMailObservable(),
  isLoggedIn: this.authService.isLoggedInObservable() 
});

  constructor(private authService: AuthService, private router: Router) { }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['']);
  }
  toggleMenu() {
    this.expanded = !this.expanded;
  }
}
