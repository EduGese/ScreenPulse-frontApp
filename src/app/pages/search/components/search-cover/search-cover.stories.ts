import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SearchCoverComponent } from './search-cover.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

const meta: Meta<SearchCoverComponent> = {
  title: 'Pages/Search/Components/SearchCover',
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
Displays the prominent cover area for the search page, highlighting three main categories (MediaItems, TV Shows, Videogames) with their respective icons and descriptions.

The content is static and visually styled, designed as a "dumb" presentational component without inputs or outputs.

## Features

- 📱 Responsive layout adapts on mobile and tablet devices
- 🎨 Uses Angular Material icons for visual identification
- ✨ Strong UX emphasis on clarity and design
- 🚫 No dynamic behavior; purely for display purposes

## Usage Example

### Template (HTML)

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
