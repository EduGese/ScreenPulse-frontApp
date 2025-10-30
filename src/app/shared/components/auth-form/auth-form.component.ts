import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

/**
 * 
 * Reusable authentication form component supporting login and registration flows
 * 
 */
@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  /** Form type: login or register */
  @Input() formType: 'login' | 'register' = 'login';

  /** Emits validated user data on form submission */
  @Output() formSubmit = new EventEmitter<User>();

  title!: string;
  submitButtonText!: string;
  showNameField!: boolean;
  showRegisterLink!: boolean;
  showPasswordHint!: boolean;

  form!: FormGroup;
  hidePassword = true;
  private passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.configureByFormType();
    this.buildForm();
  }
  
  private configureByFormType(): void {
    if (this.formType === 'register') {
      this.title = 'Join us!';
      this.submitButtonText = 'Sign Up';
      this.showNameField = true;
      this.showRegisterLink = false;
      this.showPasswordHint = true;
    } else {
      this.title = 'Open the door';
      this.submitButtonText = 'Login';
      this.showNameField = false;
      this.showRegisterLink = true;
      this.showPasswordHint = false;
    }
  }

  private buildForm(): void {
    const controls: Partial<Record<string, unknown>> = {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(this.passwordPattern)
      ]]
    };

    if (this.showNameField) {
      controls['name'] = ['', Validators.required];
    }

    this.form = this.fb.group(controls);
  }

  handleSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }

  handleClear(): void {
    this.form.reset();
  }
}
