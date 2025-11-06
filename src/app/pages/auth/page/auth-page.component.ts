import { finalize } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/auth.model';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
/**
 * Unified authentication page component handling both login and registration flows.
 * 
 * @description
 * Displays AuthFormComponent with form type determined by route data.
 * Handles form submission and navigation based on authentication result.
 */
export class AuthPageComponent implements OnInit {
  formType: 'login' | 'register' = 'login';
  isAuthenticating = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.formType = data['formType'] || 'login';
    });
  }

  handleFormSubmit(user: User): void {
    if (this.formType === 'login') {
      this.handleLogin(user);
    } else {
      this.handleRegister(user);
    }
  }

  /**
   * @private
   * @ignore
   */
  private handleLogin(formData: User): void {
    this.isAuthenticating = true;
    this.userService.login(formData)
    .pipe(
      finalize(()=>{
        this.isAuthenticating = false;
      })
    )
    .subscribe({
      next: (data) => {
        this.authService.setUserSession(data.user, data.token);
        this.toastrService.success(`Welcome, ${data.user.name}`, `You are logged in`)
        this.router.navigate(['']);
      },
      error: (error) => {
        this.toastrService.error(error.message);
      }
    });
  }

  /**
   * @private
   * @ignore
   */
  private handleRegister(formData: User): void {
    this.isAuthenticating = true;
    this.userService.register(formData)
    .pipe(
      finalize(()=>{
        this.isAuthenticating = false;
      })
    )
    .subscribe({
      next: (data) => {
        this.toastrService.success(`Welcome to ScreenPulse ${data.name}`, `Succesful registration`,)
        this.router.navigate(['login']);
      },
      error: (error) => {
        this.toastrService.error(error.message);
      }
    });
  }
}
