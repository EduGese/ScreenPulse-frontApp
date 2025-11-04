import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EmptyStateComponent } from './empty-state.component';
import { CommonModule } from '@angular/common';

const meta: Meta<EmptyStateComponent> = {
  title: 'Shared/EmptyState',
  component: EmptyStateComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [EmptyStateComponent],
      imports: [CommonModule],
    }),
  ],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'app background',
      values: [{ name: 'app background', value: '#000000' }]
    },
    docs: {
      description: {
        component: `
Displays a message and image when there is no data to show.

## Features
- Customizable through 'message', 'imageUrl', and 'alt' inputs
- Responsive image scaling
- Default black background for centered layout

## Usage Example
\`\`\`html
<app-empty-state></app-empty-state>
<app-empty-state
  message="No results found."
  imageUrl="/images/monkey3.jpg"
  alt="empty state image">
</app-empty-state>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Displayed text message',
      table: {
        category: 'Inputs',
        defaultValue: { summary: `Upps... We didn't find anything...` }
      }
    },
    imageUrl: {
      control: 'text',
      description: 'URL of image displayed',
      table: {
        category: 'Inputs',
        defaultValue: { summary: '/images/monkey3.jpg' }
      }
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
      table: {
        category: 'Accessibility',
        defaultValue: { summary: 'empty state image' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<EmptyStateComponent>;

export const Default: Story = {
  args: {
    message: `Upps... We didn't find anything...`,
    imageUrl: 'assets/images/monkey3.jpg',
    alt: 'empty state image'
  }
};

export const CustomContent: Story = {
  args: {
    message: `No favorites yet — start exploring!`,
    imageUrl: 'assets/images/monkey2.jpg',
    alt: 'empty state image'
  }
};
