import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  isLogin: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  login(formData: User): void {
    this.isLogin = true;
    this.userService.login(formData).subscribe({
      next: (data) => {
        this.authService.setUserSession(data.user, data.token);
        this.toastrService.success(`Welcome, ${data.user.name}`, `You are logged in`,)
        this.router.navigate(['']);
      },
      error: (error) => {
        if (error.status === 0) {
          this.toastrService.error("There was a problem connecting to the server. Please check your internet connection or try again later.")
        } else {
          this.toastrService.error(error.message);
        }
      },
      complete: () => {
        this.isLogin = false;
      }
    });
  }

}
