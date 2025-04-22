import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  userMail: string | null = '';
  private destroy$ = new Subject<void>();
  expanded: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUserMailObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(userMail => {
        this.userMail = userMail;
      });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['']);
  }
  toogleMenu() {
    this.expanded = !this.expanded;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
