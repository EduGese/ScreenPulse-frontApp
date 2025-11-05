import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NavbarComponent } from './navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';


class AuthServiceMock {
  private userMailSubject = new BehaviorSubject<string | null>('test@example.com');
  private userLoggedInSubject = new BehaviorSubject<boolean>(true);

  getUserMailObservable(): Observable<string | null> {
    console.log('Mock: getUserMailObservable called');
    return this.userMailSubject.asObservable();
  }

  isLoggedInObservable(): Observable<boolean> {
    console.log('Mock: isLoggedInObservable called');
    return this.userLoggedInSubject.asObservable();
  }

  logOut(): void {
    console.log('Mock: logOut called');
    this.userMailSubject.next(null);
    this.userLoggedInSubject.next(false);
  }

  setUserMail(mail: string | null): void {
    this.userMailSubject.next(mail);
  }

  setLoggedIn(isLoggedIn: boolean): void {
    this.userLoggedInSubject.next(isLoggedIn);
  }
}

const meta: Meta<NavbarComponent> = {
  title: 'Layout/Global/Navbar',
  component: NavbarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: AuthService, useValue: new AuthServiceMock() },
      ],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light background',
      values: [
        { name: 'dark background', value: '#000000' },
        { name: 'light background', value: '#ffffffff' }
      ],
    },
    docs: {
      description: {
        component: `
# Navbar Component

**Component Type:** Smart Component (Container Component)

Global navigation bar with authentication state management and responsive mobile menu.

## Features

- 🔐 **Auth state management**: Displays login/logout options via AuthService observables
- 📱 **Mobile responsive**: Collapses to hamburger menu on screens ≤600px
- 🎯 **Navigation links**: Home (Search), Favorites with active route highlighting
- 🎨 **Custom amber theme**: Dynamic hover animations and transitions
- 📊 **User session display**: Shows user email when logged in

## Architecture Pattern

This component follows the **Observable Data Service** pattern for reactive state management.

### Data Flow

\`\`\`
AuthService (Singleton)
    ↓
BehaviorSubjects (email, isLoggedIn)
    ↓
Observable Streams
    ↓
combineLatest (userData$)
    ↓
async pipe (template)
    ↓
UI Rendering
\`\`\`

## Service Integration

### AuthService

This component subscribes to two observables from \`AuthService\`:

| Observable | Type | Purpose |
|------------|------|---------|
| \`getUserMailObservable()\` | \`Observable<string | null>\` | User email stream |
| \`isLoggedInObservable()\` | \`Observable<boolean>\` | Login status stream |

**Pattern:** BehaviorSubject + async pipe for reactive updates.

### Router

Used for navigation after logout: \`router.navigate([''])\`

## State Management

### Reactive State (Observables)

\`\`\`typescript
readonly userData$ = combineLatest({
  email: this.authService.getUserMailObservable(),
  isLoggedIn: this.authService.isLoggedInObservable()
});
\`\`\`

- **Subscription:** Handled automatically via \`async\` pipe
- **Change Detection:** OnPush strategy for performance
- **Updates:** Reactive - UI updates when observables emit

### Local State

- \`expanded: boolean\` - Mobile menu toggle (component-only state)

## Why No @Input/@Output?

This is a **global smart component** that:

- ✅ Lives at the app root level (\`app.component.html\`)
- ✅ Manages its own data via service injection
- ✅ Does NOT need parent-child communication
- ✅ Follows the Observable Data Service pattern

**This is the correct approach for global layout components.**

## Usage Example

### App Layout Structure

\`\`\`html
<!-- app.component.html -->

<app-navbar></app-navbar>

<div class="site-content">
  <router-outlet></router-outlet>
</div>

<app-footer></app-footer>
\`\`\`

### Template Pattern (async pipe)

\`\`\`html
<ng-container *ngIf="userData$ | async as data">
  <!-- Logged Out State -->
  <ng-container *ngIf="!data.isLoggedIn">
    <a routerLink="/auth/register">Join us!</a>
    <a routerLink="/auth/login">Login</a>
  </ng-container>

  <!-- Logged In State -->
  <ng-container *ngIf="data.isLoggedIn">
    <span>Welcome {{ data.email }}</span>
    <button (click)="logOut()">Logout</button>
  </ng-container>
</ng-container>
\`\`\`

## Responsive Breakpoints

- **Mobile** (≤600px): Hamburger menu, hidden auth buttons
- **Desktop** (≥601px): Full navigation, inline auth status

        `,
      },
    },
  },
  argTypes: {
    expanded: {
      table: { disable: true }
    },
    userData$: {
      table: { disable: true }
    },
    logOut: {
      table: { disable: true }
    },
    toggleMenu: {
      table: { disable: true }
    }
  }

};

export default meta;
type Story = StoryObj<NavbarComponent>;


/**
 * Default state: User is logged in
 * 
 * Displays the authenticated user experience with:
 * - User email in the navbar
 * - Logout button visible
 * - Search and Favorites navigation links
 * - No authentication buttons (register/login)
 */
export const Default: Story = {
};

/**
 * User not logged in state
 * 
 * Demonstrates the unauthenticated user experience with:
 * - "Join us!" registration link
 * - Login button
 * - Search and Favorites navigation links (accessible to all)
 * - Welcome message hidden
 */
export const LoggedOut: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: AuthService,
          useValue: (() => {
            const mock = new AuthServiceMock();
            mock.setLoggedIn(false);
            mock.setUserMail(null);
            return mock;
          })(),
        },
      ],
    }),
  ],
};

/**
 * Mobile viewport with expanded menu (logged in)
 * 
 * >__Note__: *Select this story in Canvas to see mobile viewport applied.
 * >In Docs tab, parameters only affect Canvas view, not documentation.*
 */
export const MobileExpandedLoggedIn: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Mobile viewport with expanded menu (logged out)
 * 
 * >__Note__: *Select this story in Canvas to see mobile viewport applied.
 * >In Docs tab, parameters only affect Canvas view, not documentation.*
 */
export const MobileExpandedLoggedOut: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: AuthService,
          useValue: (() => {
            const mock = new AuthServiceMock();
            mock.setLoggedIn(false);
            mock.setUserMail(null);
            return mock;
          })(),
        },
      ],
    }),
  ],
};
