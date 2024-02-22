import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {

  userMail: string | null = '';
  private userMailSubscription!: Subscription;
  expanded: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userMailSubscription = this.authService.getUserMailObservable().subscribe(userMail => {
      this.userMail = userMail;
    });
  }

  ngOnDestroy(): void {
    this.userMailSubscription.unsubscribe();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['']);
  }
  toogleMenu() {
    if(!this.expanded){
    this.expanded = true;
  }else{
    this.expanded = false;
  }
  }
}
