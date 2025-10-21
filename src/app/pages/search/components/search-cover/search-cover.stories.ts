import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SearchCoverComponent } from './search-cover.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

const meta: Meta<SearchCoverComponent> = {
  title: 'Search/Feature/SearchCover',
  component: SearchCoverComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [SearchCoverComponent],
      imports: [CommonModule, MatIconModule],
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
Displays a visually rich cover for the search page.

## Features
- Highlights MediaItems, Series, and Videogames with category icons
- Provides descriptive sections for each media type
- Responsive layout optimized for desktop and mobile
- Presents a background image with gradient overlay
- No inputs: designed strictly for static display

## Example Usage
\`\`\`html
<app-search-cover></app-search-cover>
\`\`\`
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<SearchCoverComponent>;

export const Default: Story = {
  args: {}
};
