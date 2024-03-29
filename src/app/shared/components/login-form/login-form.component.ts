import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  hide = true;
  form: FormGroup;
@Output() formDataEvent = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.formDataEvent.emit(formData);
    }
  }
  onClear(){
    this.form.reset();
  }
  getAccessToGuess(){
    const formData = {email: 'Guest', password: 'abc123.'};
    this.formDataEvent.emit(formData);
  }
}
