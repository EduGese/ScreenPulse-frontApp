import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  hidePassword = true;
  form: FormGroup; 
  private passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
  
  @Output() submitRegisterData = new EventEmitter<User>();

 

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.passwordPattern)
      ]]
    });
  }
  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitRegisterData.emit(this.form.value);
  }
  onClear(): void {
    this.form.reset();
  }
}
