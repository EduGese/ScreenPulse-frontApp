import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AuthFormComponent } from './auth-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

const meta: Meta<AuthFormComponent> = {
  title: 'Shared/AuthForm',
  component: AuthFormComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        RouterTestingModule
      ],
      declarations: [AuthFormComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'app background',
      values: [
        { name: 'app background', value: '#000000d5' }
      ],
    },
    controls: {
      include: ['formType', 'formSubmit'], 
    },
    docs: {
      description: {
        component: `
  Reusable authentication form component supporting login and registration flows
  
  ## Features
  
  - 📋 Two form modes: login and register
  - ✅ Reactive form validation with email and password patterns
  - 🔐 Password visibility toggle
  - 👤 Dynamic name field for registration
  - 📱 Responsive Material Design layout
  
  ## Key Capabilities
  
  The component provides a simple authentication interface:
  - **Two form modes** controlled by single formType input
  - **Real-time validation** with email and password requirements
  - **Accessible controls** with ARIA labels
  - **Automatic configuration** based on form type
  - **Type-safe form handling**

## Usage Example

### Login Form

\`\`\`html
<app-auth-form
  formType="login"
  (formSubmit)="handleLogin($event)">
</app-auth-form>
\`\`\`

### Registration Form

\`\`\`html
<app-auth-form
  formType="register"
  (formSubmit)="handleRegister($event)">
</app-auth-form>
\`\`\`

### Component (TypeScript)

\`\`\`typescript
export class AuthPageComponent {
  handleLogin(user: User): void {
    this.authService.login(user).subscribe(
      (response) => this.router.navigate(['/dashboard']),
      (error) => this.showError(error)
    );
  }

  handleRegister(user: User): void {
    this.authService.register(user).subscribe(
      (response) => this.router.navigate(['/email-verification']),
      (error) => this.showError(error)
    );
  }
}
\`\`\`

## Form Validation

| Field | Rules | Error Message |
|-------|-------|---------------|
| **Email** | Required, valid email format | "Email is required" or "Incorrect email format" |
| **Password** | Required, min 6 chars, letters + numbers + special chars | "Password is required" or "Min 6 char incl. letters, numbers and special characters" |
| **Name** | Required (register only) | "Name is required" |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| \`formSubmit\` | \`User\` | Emitted when form is submitted with valid values |

## Accessibility

- ✅ ARIA labels on all form fields and buttons
- ✅ Keyboard accessible password visibility toggle
- ✅ Proper label associations with form inputs
- ✅ Error messages linked to form fields
- ✅ Focus management and visual indicators
        `,
      },
    },
  },
  argTypes: {
    formType: {
      control: 'radio',
      options: ['login', 'register'],
      description: 'Type of authentication form to display',
    },
    formSubmit: {
      action: 'formSubmit',
    },
  },
};

export default meta;
type Story = StoryObj<AuthFormComponent>;

export const LoginForm: Story = {
  args: {
    formType: 'login',
  },
  argTypes: {
    formType: {
      control: { disable: true },     
    },
    formSubmit: {
      control: { disable: true },
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard login form with email, password, and link to registration page. This matches the production implementation.',
      },
    },
  },
};

export const RegisterForm: Story = {
  args: {
    formType: 'register',
  },
  argTypes: {
    formType: {
      control: { disable: true },  
      table: { disable: false }
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete registration form with name, email, password fields, and password requirements hint. This matches the production implementation.',
      },
    },
  },
};


