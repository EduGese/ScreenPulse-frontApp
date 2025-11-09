import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { AuthPageComponent } from './auth-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { of, BehaviorSubject, Observable, delay, throwError, switchMap } from 'rxjs';
import { User, AuthUser, LoginResponse, RegisterResponse } from 'src/app/shared/models/auth.model';
import { AuthFormComponent } from '../components/auth-form/auth-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from 'src/app/layout/navbar/navbar.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from 'src/app/core/services/auth.service';

class UserServiceMock {
    login(user: User): Observable<LoginResponse> {
        const username = user.email.split('@')[0];
        const capitalizedName = username.charAt(0).toUpperCase() + username.slice(1);
        return of<LoginResponse>({
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ',
            user: {
                _id: '507f1f77bcf86cd799439011',
                name: capitalizedName || 'John Doe',
                email: user.email || 'john@example.com',
            },
        })
            .pipe(
                delay(1500)
            );
    }

    register(user: User): Observable<RegisterResponse> {
        return of<RegisterResponse>({
            _id: '507f1f77bcf86cd799439012',
            name: user.name,
            email: user.email,
        })
            .pipe(
                delay(1500)
            );
    }
}


class UserServiceErrorMock {
    login(): Observable<LoginResponse> {
        return of(null).pipe(
            delay(1500),
            switchMap(() =>
                throwError(() => ({
                    message: 'Invalid email or password'
                }))
            )
        );
    }

    register(): Observable<RegisterResponse> {
        return of(null).pipe(
            delay(1500),
            switchMap(() =>
                throwError(() => ({
                    message: 'Invalid email or password'
                }))
            )
        );
    }
}

class AuthServiceMock {
    private userMailSubject = new BehaviorSubject<string | null>(null);
    private userLoggedInSubject = new BehaviorSubject<boolean>(false);

    setUserSession(user: AuthUser, token: string) {
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('userMail', user.email);
        sessionStorage.setItem('userName', user.name);
        this.userMailSubject.next(user.email);
        this.userLoggedInSubject.next(true);
    }


    getAuthToken(): string | null {
        return sessionStorage.getItem('authToken');
    }

    isLoggedInObservable() {
        return this.userLoggedInSubject.asObservable();
    }

    getUserMailObservable() {
        return this.userMailSubject.asObservable();
    }

    setUserMail(mail: string | null): void {
        this.userMailSubject.next(mail);
    }

    setLoggedIn(isLoggedIn: boolean): void {
        this.userLoggedInSubject.next(isLoggedIn);
    }

    logOut(): void {
        console.log('Mock: logOut called');
        this.userMailSubject.next(null);
        this.userLoggedInSubject.next(false);
    }
}

const meta: Meta<AuthPageComponent> = {
    title: 'Pages/Auth/Page/AuthPage',
    component: AuthPageComponent,
    //subcomponents: { AuthFormComponent, },
    tags: ['autodocs'],
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
            ],
        }),
        moduleMetadata({
            imports: [
                CommonModule,
                ReactiveFormsModule,
                FormsModule,
                MatToolbarModule,
                MatIconModule,
                MatButtonModule,
                MatListModule,
                RouterTestingModule,
                MatInputModule,
                MatDividerModule,
                MatProgressBarModule,
                ToastrModule.forRoot(),
            ],
            declarations: [AuthPageComponent, AuthFormComponent, NavbarComponent, FooterComponent, LoadingSpinnerComponent],
            providers: [
                { provide: ToastrService, useClass: ToastrService },
            ],
        }),
    ],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `

Container component handling login and registration flows with full service integration.

## Component Type

**Smart Component** - Manages authentication state, service calls, and session management.

## Features

- 🔐 **Dual mode**: Login and registration determined by route data
- 📡 **Service integration**: 
  - UserService for API calls (login/register)
  - AuthService for session management (BehaviorSubjects + sessionStorage)
- ⏳ **Loading state**: Disables form during request
- 🎨 **Toast notifications**: Success/error feedback via ngx-toastr
- 🚀 **Auto-navigation**: Redirects after successful auth
- 💾 **Session persistence**: Stores token + user data in sessionStorage

## Child Components

- **AuthFormComponent**: Presentational form (fields + validation)
- **LoadingSpinnerComponent**: Visual loading indicator

## Service Dependencies

### UserService
- \`login(user: User)\`: POST /api/users/login
  - Request: User { name, email, password }
  - Returns: LoginResponse { token, user: AuthUser }
  - On success: Sets session via AuthService + navigate home
  
- \`register(user: User)\`: POST /api/users/register
  - Request: User { name, email, password }
  - Returns: RegisterResponse extends AuthUser
  - On success: Show success toast + navigate to login

### AuthService
- \`setUserSession(user: AuthUser, token)\`: Store session
  - Sets: authToken, userMail, userName in sessionStorage
  - Emits: userLoggedInSubject.next(true)
  
- \`getAuthToken()\`: Retrieve stored token
- \`isLoggedInObservable()\`: Observable of auth state
- \`logOut()\`: Clear all session data

## Data Flow

\`\`\`
Route Data (formType: 'login' | 'register')
    ↓
AuthPage.ngOnInit() reads formType
    ↓
AuthForm (@Input formType) renders appropriate form
    ↓
User submits form (@Output formSubmit: User)
    ↓
AuthPage.handleFormSubmit(user: User)
    ↓
Delegates to handleLogin() or handleRegister()
    ↓
Call UserService.login() or register()
    ↓
Success:
  1. UserService returns LoginResponse/RegisterResponse
  2. AuthService.setUserSession(response.user, token)
  3. sessionStorage + BehaviorSubjects updated
  4. Toast: "Welcome, {user.name}"
  5. Router.navigate() to home or login
    ↓
Error:
  1. Toast: error message
  2. Form remains enabled for retry
  3. isAuthenticating reset to false
\`\`\`

## Type Safety

### Request Type
- **User**: Full user data including password (requests only)
  - name: string (required, form validation)
  - email: string (required, form validation)
  - password?: string (optional, for requests)
  - _id?: string (optional, not sent in auth)

### Response Type
- **AuthUser**: Safe user data from server (never has password)
  - _id: string (required, from backend)
  - email: string (required, from backend)
  - name: string (required, from backend)

- **LoginResponse**: Login endpoint response
  - token: string (JWT for authorization)
  - user: AuthUser (safe user data)

- **RegisterResponse**: Register endpoint response
  - Extends AuthUser (same safe structure)

## Error Handling

- Invalid credentials → Error toast
- Email already registered → Error toast
- Network error → Error toast
- Form remains enabled for retry
- isAuthenticating reset prevents duplicate submissions
        `,
            },
        },
    },
};

export default meta;
type Story = StoryObj<AuthPageComponent>;

/**
 * Login mode with successful authentication
 * 
 * Complete login flow:
 * 1. User enters email + password
 * 2. Submits AuthForm
 * 3. handleFormSubmit(user: User) called
 * 4. handleLogin() delegates to UserService.login(user)
 * 5. Mock returns LoginResponse { token, user: AuthUser }
 * 6. AuthService.setUserSession(user: AuthUser, token)
 *    - Stores token in sessionStorage
 *    - Stores user email + name
 *    - Emits userLoggedInSubject.next(true)
 * 7. Toast: "Welcome, {user.name}"
 * 8. Router.navigate([''])
 * 
 * **Mock**: UserServiceMock returns valid LoginResponse with AuthUser
 */
export const LoginSuccess: Story = {
    decorators: [
        moduleMetadata({
            providers: [
                { provide: ActivatedRoute, useValue: { data: of({ formType: 'login' }) } },
                { provide: AuthService, useValue: new AuthServiceMock() },
                { provide: UserService, useClass: UserServiceMock }
            ],
        }),
    ],
    render: () => ({
        template: `
            <app-navbar></app-navbar>
            <app-auth-page></app-auth-page>
            <app-footer></app-footer>
        `,
    }),
};

/**
 * Login with authentication error
 * 
 * Failed login scenario (wrong credentials):
 * 1. User submits invalid email/password combination
 * 2. UserService.login(user) called
 * 3. Mock waits 1.5s (loading spinner visible)
 * 4. Mock returns error: "Invalid email or password"
 * 5. Error handler triggered:
 *    - Toast error message displayed
 *    - Form remains enabled (not locked)
 *    - isAuthenticating reset to false
 *    - No session stored (AuthService not called)
 * 6. User can retry with correct credentials
 * 
 * **Mock**: UserServiceErrorMock returns error observable after 1.5s delay
 */
export const LoginError: Story = {
    decorators: [
        moduleMetadata({
            providers: [
                { provide: ActivatedRoute, useValue: { data: of({ formType: 'login' }) } },
                { provide: AuthService, useValue: new AuthServiceMock() },
                { provide: UserService, useClass: UserServiceErrorMock }
            ],
        }),
    ],
    render: () => ({
        template: `
            <app-navbar></app-navbar>
            <app-auth-page></app-auth-page>
            <app-footer></app-footer>
        `,
    }),
};

/**
 * Register mode with successful registration
 *
 * Complete registration flow:
 * 1. User enters name + email + password
 * 2. Form requires all fields (name is mandatory)
 * 3. Submits AuthForm with User { name, email, password }
 * 4. handleFormSubmit(user: User) called
 * 5. handleRegister() delegates to UserService.register(user)
 * 6. Mock returns RegisterResponse extends AuthUser
 * 7. Toast: "Welcome to ScreenPulse {user.name}"
 * 8. Router.navigate(['login'])
 * 9. User must login after registering
 *
 * **Mock**: UserServiceMock returns valid RegisterResponse with AuthUser
 */
export const RegisterSuccess: Story = {
    decorators: [
        moduleMetadata({
            providers: [
                { provide: ActivatedRoute, useValue: { data: of({ formType: 'register' }) } },
                { provide: AuthService, useValue: new AuthServiceMock() },
                { provide: UserService, useClass: UserServiceMock }
            ],
        }),
    ],
    render: () => ({
        template: `
         <app-navbar></app-navbar>
         <app-auth-page></app-auth-page>
         <app-footer></app-footer>
        `,
    }),
};


/**
 * Register with validation error
 *
 * Failed registration scenario (email already exists):
 * 1. User enters name + email + password (email already registered)
 * 2. Form validates (name required, email format, password strength)
 * 3. Submits User { name, email, password }
 * 4. UserService.register(user) called
 * 5. Mock returns error: "Email already registered"
 * 6. Error handler triggered:
 *    - Toast error message displayed
 *    - Form remains enabled
 *    - isAuthenticating reset to false
 *    - User can try different email or navigate to login
 *
 * **Mock**: UserServiceErrorMock returns error observable
 */
export const RegisterError: Story = {
    decorators: [
        moduleMetadata({
            providers: [
                { provide: ActivatedRoute, useValue: { data: of({ formType: 'register' }) } },
                { provide: AuthService, useValue: new AuthServiceMock() },
                { provide: UserService, useClass: UserServiceErrorMock }
            ],
        }),
    ],
    render: () => ({
        template: `
            <app-navbar></app-navbar>
            <app-auth-page></app-auth-page>
            <app-footer></app-footer>
        `,
    }),
};
