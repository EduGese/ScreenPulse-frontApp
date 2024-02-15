import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { RegisterFormData } from 'src/app/shared/models/registerFormData.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}

  getRegister(formData: RegisterFormData) {

    this.userService.register(formData).subscribe({
      next: (data) => {
        console.log('Registro:', data);
        this.router.navigate(['login']);
      },
      error: (error) => {
        console.log(error.error.error);
        alert(error.error.message);
      },
    });
  }
}
