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

  isRegistering = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService) { }

  getRegistered(formData: User): void {
    this.isRegistering = true;
    this.userService.register(formData).subscribe({
      next: (data) => {
        this.isRegistering = false;
        this.toastrService.success(`Welcome to ScreenPulse ${data.name}`, `Succesful registration`,)
        this.router.navigate(['login']);
      },
      error: (error) => {
        this.isRegistering = false;
        this.toastrService.error(error.message);
      }
    });
  }
}
