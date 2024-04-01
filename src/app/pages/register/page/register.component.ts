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

  userSearch: boolean = false;

  constructor(
    private userService: UserService, 
    private router: Router, 
    private toastrService: ToastrService) {}

  getRegister(formData: User) {
    this.userSearch = true;
    this.userService.register(formData).subscribe({
      next: (data) => {
        this.userSearch = false;
        this.toastrService.success(`Welcome to ScreenPulse ${data.userName}`,`Succesful registration`, )
        this.router.navigate(['login']);
      },
      error: (error) => {
        if(error.status===0){
          this.userSearch = false;
          this.toastrService.error("There was a problem connecting to the server. Please check your internet connection or try again later.")
        }else{
          this.toastrService.error(error.error.message);
        }
       
      }
    });
  }
}
