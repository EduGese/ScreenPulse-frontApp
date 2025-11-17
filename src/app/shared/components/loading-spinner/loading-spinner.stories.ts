import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

const meta: Meta<LoadingSpinnerComponent> = {
  title: 'Shared/LoadingSpinner',
  component: LoadingSpinnerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [LoadingSpinnerComponent],
      imports: [CommonModule, MatProgressBarModule, MatIconModule],
    }),
  ],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'app background',
      values: [{ name: 'app background', value: '#000000' }],
    },
    docs: {
      description: {
        component: `
Displays a loading spinner with an indeterminate progress bar and an inline icon.

## Features
- Shows/hides spinner based on 'visible' input
- Uses Angular Material progress bar and icon with accent color
- Centered text and spinner over black background

## Usage Example
\`\`\`html
<app-loading-spinner [visible]="true"></app-loading-spinner>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Controls the visibility of the spinner',
      table: {
        category: 'Inputs',
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<LoadingSpinnerComponent>;

export const Visible: Story = {
  args: {
    visible: true,
  },
};

export const Hidden: Story = {
  args: {
    visible: false,
  },
};


