import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private userService: UserService, 
    private router: Router, 
    private toastrService: ToastrService) {}

  getRegister(formData: User) {

    this.userService.register(formData).subscribe({
      next: (data) => {
        console.log('Registro:', data);
        this.router.navigate(['login']);
      },
      error: (error) => {
        this.toastrService.error(error.error.message);
      },
    });
  }
}
