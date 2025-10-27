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

  isLogin = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  handleLogin(formData: User): void {
    this.isLogin = true;
    this.userService.login(formData).subscribe({
      next: (data) => {
        this.authService.setUserSession(data.user, data.token);
        this.toastrService.success(`Welcome, ${data.user.name}`, `You are logged in`)
        this.isLogin = false;
        this.router.navigate(['']);
      },
      error: (error) => {
        this.toastrService.error(error.message);
        this.isLogin = false;
      }
    });
  }

}
