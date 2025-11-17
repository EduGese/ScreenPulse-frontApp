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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<AuthFormComponent> = {
  title: 'Pages/Auth/Components/AuthForm',
  component: AuthFormComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
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
      include: ['formSubmit', 'formType', 'disabled'], 
    },
    docs: {
      description: {
        component: `
Reusable authentication form component supporting login and registration flows.

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

### Disabled Form (During API Call)

\`\`\`html
<app-auth-form
  formType="login"
  [disabled]="isAuthenticating"
  (formSubmit)="handleLogin($event)">
</app-auth-form>
\`\`\`

### Component (TypeScript)

\`\`\`typescript
export class AuthPageComponent {
  isAuthenticating = false;

  handleLogin(user: User): void {
    this.isAuthenticating = true;
    this.authService.login(user).subscribe({
      next: (response) => {
        this.router.navigate(['/dashboard']);
        this.isAuthenticating = false;
      },
      error: (error) => {
        this.showError(error);
        this.isAuthenticating = false;
      }
    });
  }

  handleRegister(user: User): void {
    this.isAuthenticating = true;
    this.authService.register(user).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
        this.isAuthenticating = false;
      },
      error: (error) => {
        this.showError(error);
        this.isAuthenticating = false;
      }
    });
  }
}
\`\`\`

## Form Validation

| Field | Rules | Error Message |
|-------|-------|---------------|
| **Email** | Required, valid email format | "Email is required" or "Incorrect email format" |
| **Password** | Required, min 6 chars, letters + numbers + special chars | "Password is required" or "Min 6 char incl. letters, numbers and special characters" |
| **Name** | Required (register only) | "Name is required" |

## Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`formType\` | \`'login' \\| 'register'\` | \`'login'\` | Form mode: login (email+password) or register (name+email+password) |
| \`disabled\` | \`boolean\` | \`false\` | Disables form during API calls |

## Outputs

| Event | Payload | Description |
|-------|---------|-------------|
| \`formSubmit\` | \`User\` | Emitted when form is submitted with valid values |

## Form Configuration by Type

| Aspect | Login | Register |
|--------|-------|----------|
| **Title** | "Open the door" | "Join us!" |
| **Fields** | Email, Password | Name, Email, Password |
| **Submit Button** | "Login" | "Sign Up" |
| **Register Link** | Yes | No |
| **Password Hint** | No | Yes |

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
    disabled: false
  },
  argTypes: {
    formType: {
      control: { disable: true }
    },
    disabled: {
      control: { disable: true }
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
Standard login form with email and password fields.


**Visual Configuration**:
- **Title**: "Open the door"
- **Fields**: Email, Password
- **Submit Button**: "Login"
- **Additional UI**: Link to register page
- **Password Hint**: Hidden

**Use Case**: Default authentication entry point for returning users.

**Interaction**: Fill the form and click Submit to see the \`formSubmit\` action logged with form data.
        `
      }
    }
  }
};


export const RegisterForm: Story = {
  args: {
    formType: 'register',
    disabled: false
  },
  argTypes: {
    formType: {
      control: { disable: true }
    },
    disabled: {
      control: { disable: true }
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
Complete registration form with name, email, and password fields.


**Visual Configuration**:
- **Title**: "Join us!"
- **Fields**: **Name** (additional field), Email, Password
- **Submit Button**: "Sign Up"
- **Additional UI**: Password requirements hint visible
- **Register Link**: Hidden (already on registration)

**Use Case**: New user account creation flow.

**Key Difference from Login**: Includes name field and shows password complexity requirements to help users create valid passwords.

**Interaction**: Fill all fields and submit to see the complete User object (including name) in the action log.
        `
      }
    }
  }
};

export const DisabledForm: Story = {
  args: {
    formType: 'login',
    disabled: true
  },
  argTypes: {
    formType: {
      control: { disable: true }
    },
    disabled: {
      control: { disable: true }
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
Login form in disabled state during authentication process.


**Visual State**:
- All input fields are disabled (grayed out)
- Submit button is disabled
- User cannot interact with the form

**Use Case**: Displayed while API authentication request is in progress to prevent:
- Duplicate form submissions
- User editing data during processing
- Multiple simultaneous login attempts

**Parent Component Pattern**:

\`\`\`typescript
isAuthenticating = false;

handleLogin(user: User): void {
  this.isAuthenticating = true; // Disables form
  this.authService.login(user).subscribe({
    next: () => this.router.navigate(['/']),
    error: () => this.showError(),
    complete: () => this.isAuthenticating = false // Re-enables form
  });
}
\`\`\`

**Typical Duration**: 500ms - 2s (API round-trip time).
        `
      }
    }
  }
};

export const WithValidData: Story = {
  args: {
    formType: 'login',
    disabled: false
  },
  argTypes: {
    formType: {
      control: { disable: true }
    },
    disabled: {
      control: { disable: true }
    }
  },
  play: async ({ canvasElement }) => {
    const emailInput = canvasElement.querySelector('input[type="email"]') as HTMLInputElement;
    const passwordInput = canvasElement.querySelector('input[type="password"]') as HTMLInputElement;

    if (emailInput && passwordInput) {
      emailInput.value = 'user@example.com';
      passwordInput.value = 'Password123!';
      
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
      emailInput.dispatchEvent(new Event('blur', { bubbles: true }));
      passwordInput.dispatchEvent(new Event('blur', { bubbles: true }));
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
Login form pre-filled with valid credentials ready for submission.

**⚠️ Interactive Feature**: This story uses \`play()\` to auto-fill the form. 
**Switch to Canvas tab** to see it in action.

**Form State**:
- **Email**: user@example.com (valid format)
- **Password**: Password123! (meets all requirements)
- **Validation**: All fields pass validation ✅
- **Submit Button**: Enabled and ready

**Visual Indicators**:
- No error messages displayed
- Input fields show valid state (Material Design success styling)
- Submit button is clickable

**Use Case**: 
- Testing successful form submission flow
- Demonstrating valid form state
- Password manager auto-fill scenario

**Interaction**: Click Submit button to see the validated User object logged in Actions panel.

**Expected Payload**:
\`\`\`json
{
  "email": "user@example.com",
  "password": "Password123!"
}
\`\`\`
        `
      }
    }
  }
};

export const WithValidationErrors: Story = {
  args: {
    formType: 'login',
    disabled: false
  },
  argTypes: {
    formType: {
      control: { disable: true }
    },
    disabled: {
      control: { disable: true }
    }
  },
  play: async ({ canvasElement }) => {
    const emailInput = canvasElement.querySelector('input[type="email"]') as HTMLInputElement;
    const passwordInput = canvasElement.querySelector('input[type="password"]') as HTMLInputElement;

    if (emailInput && passwordInput) {
      emailInput.value = 'invalid-email';
      passwordInput.value = '123';
      
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
      emailInput.dispatchEvent(new Event('blur', { bubbles: true }));
      passwordInput.dispatchEvent(new Event('blur', { bubbles: true }));
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
Login form displaying validation errors for invalid input.

**⚠️ Interactive Feature**: This story uses \`play()\` to auto-fill the form. 
**Switch to Canvas tab** to see it in action.

**Invalid Data**:
- **Email**: "invalid-email" (missing @ and domain)
- **Password**: "123" (too short, missing letters and special chars)

**Visual Error State**:
- Email field shows error: "Incorrect email format"
- Password field shows error: "Min 6 char incl. letters, numbers and special characters"
- Input fields highlighted in red (Material Design error styling)
- Submit button is **disabled** until errors are corrected

**Validation Rules Tested**:

| Field | Rule Violated | Error Message |
|-------|---------------|---------------|
| Email | Must match email pattern | "Incorrect email format" |
| Password | Min 6 chars + letters + numbers + special | "Min 6 char incl..." |

**Use Case**:
- Demonstrating form validation feedback
- Testing error message display
- UX testing for invalid input handling

**User Recovery**: User must correct both fields before submit button becomes enabled.

**Try It**: Correct the email to "user@example.com" and password to "Password123!" to see errors disappear and button enable.
        `
      }
    }
  }
};
