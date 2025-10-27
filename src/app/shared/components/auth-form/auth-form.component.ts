import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

/**
 * 
 * Reusable authentication form component supporting login and sign-up flows
 * 
 * ## Features
 * 
 * - 📋 Dynamic form rendering based on formType (login or register)
 * - ✅ Reactive form validation with email and password patterns
 * - 🔐 Password visibility toggle
 * - 👤 Optional name field for registration
 * - 📱 Responsive Material Design layout
 * 
 * ## Key Capabilities
 * 
 * The component provides a flexible authentication interface with:
 * - **Configurable form modes** (login or registration) via @Input() properties
 * - **Real-time validation** with email format and password strength requirements
 * - **Accessible password toggle** with ARIA labels for screen readers
 * - **Dynamic field rendering** (name field appears conditionally for register mode)
 * - **Customizable UI text** (title, button text, helper messages)
 * - **Type-safe form handling** with strict TypeScript typing
 */
@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  /** Form type: login or register */
  @Input() formType: 'login' | 'register' = 'login';

  /** Header title */
  @Input() title = 'Open the door';

  /** Show name field (register only) */
  @Input() showNameField = false;

  /** Show register link (login only) */
  @Input() showRegisterLink = false;

  /** Show password hint (register only) */
  @Input() showPasswordHint = false;

  /** Submit button text */
  @Input() submitButtonText = 'Login';

  /** Emits validated user data on form submission */
  @Output() formSubmit = new EventEmitter<User>();

  form!: FormGroup;
  hidePassword = true;
  private passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  /**
   * Builds reactive form with email, password, and optional name field
   */
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

  /** Validates and emits form data */
  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }

  /** Resets all form fields */
  onClear(): void {
    this.form.reset();
  }
}
