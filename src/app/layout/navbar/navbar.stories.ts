import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { of } from 'rxjs';

import { NavbarComponent } from './navbar.component';
import { AuthService } from 'src/app/core/services/auth.service';

// Mock AuthService for different authentication states
class MockAuthService {
  private isAuthenticated = false;
  private userEmail = '';

  setAuthenticated(isAuth: boolean, email?: string) {
    this.isAuthenticated = isAuth;
    this.userEmail = email || '';
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUserMailObservable() {
    return of(this.userEmail);
  }

  logOut() {
    this.isAuthenticated = false;
    this.userEmail = '';
  }
}

const meta: Meta<NavbarComponent> = {
  title: 'Shared/Navbar',
  component: NavbarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [NavbarComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: '', component: NavbarComponent },
          { path: 'favorites', component: NavbarComponent },
          { path: 'login', component: NavbarComponent },
          { path: 'register', component: NavbarComponent }
        ]),
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatListModule
      ],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService
        }
      ]
    })
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Navbar Component

The main navigation bar for ScreenPulse application. Provides navigation links, authentication status display, and responsive menu functionality.

## Features

- **Responsive Design**: Desktop horizontal layout, mobile hamburger menu
- **Authentication Awareness**: Shows different UI based on login status
- **Active Route Highlighting**: Indicates current page
- **User Email Display**: Shows logged-in user's email
- **Theme**: Black background (#000000) with yellow accent (#F5CF3D)

## Breakpoints

- **Mobile**: ≤600px (hamburger menu)
- **Desktop**: >600px (horizontal links)
        `
      }
    }
  },
  argTypes: {
    userMail: {
      control: 'text',
      description: 'Email of the logged-in user'
    },
    expanded: {
      control: 'boolean',
      description: 'State of the mobile menu (expanded/collapsed)'
    }
  }
};

export default meta;
type Story = StoryObj<NavbarComponent>;

/**
 * Default state: User not logged in, desktop view
 */
export const LoggedOut: Story = {
  render: (args) => ({
    props: args,
    template: `<app-navbar></app-navbar>`
  }),
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    },
    docs: {
      description: {
        story: 'Default state showing "Join us!" and Login buttons for unauthenticated users on desktop.'
      }
    }
  }
};

/**
 * User logged in with email displayed
 */
export const LoggedIn: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: () => true,
            getUserMailObservable: () => of('user@screenpulse.com'),
            logOut: () => console.log('Logged out')
          }
        }
      ]
    })
  ],
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    },
    docs: {
      description: {
        story: 'Authenticated state displaying user email and logout button.'
      }
    }
  }
};

/**
 * Logged in with long email address
 */
export const LoggedInLongEmail: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: () => true,
            getUserMailObservable: () => of('verylongemailaddress@screenpulse.com'),
            logOut: () => console.log('Logged out')
          }
        }
      ]
    })
  ],
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    },
    docs: {
      description: {
        story: 'Testing layout with longer email addresses.'
      }
    }
  }
};

/**
 * Mobile view - logged out, menu collapsed
 */
export const MobileLoggedOut: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile viewport showing hamburger menu button. Click to expand menu.'
      }
    }
  }
};

/**
 * Mobile view - logged out, menu expanded
 */
export const MobileMenuExpanded: Story = {
  render: (args) => ({
    props: {
      ...args,
      expanded: true
    },
    template: `<app-navbar></app-navbar>`
  }),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile menu in expanded state showing navigation links and authentication options.'
      }
    }
  }
};

/**
 * Mobile view - logged in, menu expanded
 */
export const MobileLoggedInExpanded: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: () => true,
            getUserMailObservable: () => of('mobile@user.com'),
            logOut: () => console.log('Logged out')
          }
        }
      ]
    })
  ],
  render: (args) => ({
    props: {
      ...args,
      expanded: true
    },
    template: `<app-navbar></app-navbar>`
  }),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Authenticated user on mobile with expanded menu showing email and logout option.'
      }
    }
  }
};

/**
 * Tablet view
 */
export const TabletView: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: () => true,
            getUserMailObservable: () => of('tablet@user.com'),
            logOut: () => console.log('Logged out')
          }
        }
      ]
    })
  ],
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: 'Navbar behavior on tablet devices (>600px shows desktop layout).'
      }
    }
  }
};

/**
 * Interactive example with toggle functionality
 */
export const Interactive: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div>
        <p style="padding: 20px; background: #f5f5f5; margin: 0;">
          <strong>Instructions:</strong> Click the menu button on mobile view to toggle the expanded menu.
          Try resizing your viewport to see responsive behavior.
        </p>
        <app-navbar></app-navbar>
      </div>
    `
  }),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Interactive story to test menu toggle functionality and responsive behavior.'
      }
    }
  }
};
