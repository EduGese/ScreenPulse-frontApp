import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private userService: UserService) {}

  getRegister(formData: any) {//Crear interface user
    
    this.userService.register(formData).subscribe((data) => {
      console.log('Registro:',data);
    });
  }
}
