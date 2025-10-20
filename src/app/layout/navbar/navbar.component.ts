import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  //userMail$: Observable<string | null> = this.authService.getUserMailObservable();
  expanded = false;
  userData$ = combineLatest({
  email: this.authService.getUserMailObservable(),
  isLoggedIn: this.authService.isLoggedInObservable() // Mejor que método
});

  constructor(private authService: AuthService, private router: Router) { }

  // isLoggedIn() {
  //   return this.authService.isLoggedIn();
  // }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['']);
  }
  toggleMenu() {
    this.expanded = !this.expanded;
  }
}
