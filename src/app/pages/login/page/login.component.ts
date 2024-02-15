import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { LoginFormData } from 'src/app/shared/models/loginFormData.mode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  login(formData: LoginFormData) {
    this.userService.login(formData).subscribe({
      next: (data) => {
        this.authService.setAuthToken(data.token);
        this.authService.setUserMail(data.user.email);
        this.authService.setUserName(data.user.userName);
        this.router.navigate(['']);
      },
      error: (error) => {
        console.log(error);
        alert(error.error.error);
      }
    });
  }
  
}
