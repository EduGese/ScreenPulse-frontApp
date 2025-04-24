import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  hide = true;
  form: FormGroup;
  private passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
  private guestLoginData = { email: 'guest@mail.com', password: 'abc123.' }

  @Output() formDataEvent = new EventEmitter<User>();

 
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, Validators.pattern(this.passwordPattern)]]
    });
  }
  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      this.formDataEvent.emit(formData);
    }
  }
  onClear(): void {
    this.form.reset();
  }
  getAccessToGuest(): void {
    const formData = this.guestLoginData;
    this.formDataEvent.emit(formData);
  }
}
