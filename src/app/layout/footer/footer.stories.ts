import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FooterComponent } from './footer.component';
import { MatIconModule } from '@angular/material/icon';


const meta: Meta<FooterComponent> = {
  title: 'Layout/Global/Footer',
  component: FooterComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [MatIconModule],
      declarations: [FooterComponent],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light background',
      values: [
        { name: 'dark background', value: '#1A1A1A' },
        { name: 'light background', value: '#FFFFFF' }
      ],
    },
    docs: {
      description: {
        component: `
# Footer Component

Application-wide footer displaying copyright information.

## Features

- 🏷️ **Branding**: Displays ScreenPulse brand name
- 📄 **Copyright notice**: Includes Material copyright icon
- 🌐 **Global placement**: Used throughout entire application via app.component.html

## Architecture

- **Component type**: Global layout component
- **Placement**: Bottom of the viewport in app.component
- **Dependencies**: Material Icons only

## Usage Example

### App Layout Structure

### app.component.html:

\`\`\`html

<app-navbar></app-navbar>

<div class="site-content">
    <router-outlet></router-outlet>
</div>

<app-footer class="footer"></app-footer>
\`\`\`

### Styling Notes

- Apply footer-specific styles in app.component.scss using \`.footer\` class
- Keep positioning at bottom of viewport with \`position: sticky\`
- Works with both light and dark backgrounds
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<FooterComponent>;


export const Default: Story = {};

