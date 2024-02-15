import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userService: UserService) {}

  login(formData: any) {//Crear interface user
    
    this.userService.login(formData).subscribe((data) => {
      console.log('Login:',data);
    });
  }
}
