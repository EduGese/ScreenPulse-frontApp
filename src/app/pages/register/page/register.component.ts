import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/user.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  isRegistering: boolean = false;

  constructor(
    private userService: UserService, 
    private router: Router, 
    private toastrService: ToastrService) {}

  getRegistered(formData: User): void {
    this.isRegistering = true;
    this.userService.register(formData).subscribe({
      next: (data) => {
        this.isRegistering = false;
        this.toastrService.success(`Welcome to ScreenPulse ${data.name}`,`Succesful registration`, )
        this.router.navigate(['login']);
      },
      error: (error) => {
        this.isRegistering = false;
        if (error.status === 0) {
          this.toastrService.error(
            'There was a problem connecting to the server. Please check your internet connection or try again later.'
          );
        } else if (error.message === 'User already exists') {
          this.toastrService.error(
            'This email is already registered. Please use a different email.'
          );
        } else {
          this.toastrService.error(error.message);
        }
      }
    });
  }
}
