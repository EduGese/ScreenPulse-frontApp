import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SortingControlsComponent } from './sorting-controls.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const meta: Meta<SortingControlsComponent> = {
  title: 'Pages/Favorites/Components/SortingControls',
  component: SortingControlsComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [MatIconModule, MatButtonToggleModule],
      declarations: [SortingControlsComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'light background',
      values: [{ name: 'light background', value: '#FFFFFF' }],
    },
    controls: {
      include: ['currentSort', 'sortChange', 'filterChange', 'mediaTypeChange'], 
    },
    docs: {
      description: {
        component: `
# Sorting Controls Component

Multi-functional filter and sort bar for the favorites collection management.

## Features

- 🔀 **Dual-field sorting**: Toggle between title and year with ascending/descending order
- 📝 **Live filtering**: Real-time search input for title-based filtering
- 🎬 **Media type selection**: Radio-button style toggles for Movies, Series, Games, or All
- 🎨 **Custom Material theme**: Amber highlights with dark background
- 📱 **Mobile responsive**: Stacks vertically on tablets and phones

## Architecture

This is a **presentation component** that:
- Receives current filter state via \`@Input()\`
- Emits user actions via \`@Output()\` events
- Does NOT perform data filtering itself
- Delegates business logic to parent component

## Usage Example

### Parent Template

\`\`\`html
<app-sorting-controls
  [currentSort]="searchParams"
  (sortChange)="onSort($event)"
  (filterChange)="onFilter($event)"
  (mediaTypeChange)="onMediaTypeChange($event)">
</app-sorting-controls>
\`\`\`

### Parent TypeScript

\`\`\`typescript
handleSort(event: { field: string; order: number }): void {
  this.searchParams = {
    ...this.searchParams,
    sortField: event.field,
    sortOrder: event.order,
    currentPage: 1,
  };
  this.refreshFavorites();
}

handleFilter(searchTerm: string): void {
  this.searchParams = {
    ...this.searchParams,
    searchTerm: searchTerm.trim() || undefined,
    currentPage: 1,
  };
  this.refreshFavorites();
}

handleMediaTypeChange(mediaType: string): void {
  this.searchParams = {
    ...this.searchParams,
    mediaType: mediaType === 'all' ? undefined : mediaType,
    currentPage: 1,
  };
  this.refreshFavorites();
}
\`\`\`

## Events Reference

| Event | Payload | Description |
|-------|---------|-------------|
| \`sortChange\` | \`{ field: 'title' | 'year', order: 1 | -1 }\` | Emitted when clicking sort icons. Order: 1=ascending, -1=descending |
| \`filterChange\` | \`string\` | Emitted on each keystroke in filter input (parent should debounce) |
| \`mediaTypeChange\` | \`'movie' | 'series' | 'game' | 'all'\` | Emitted when toggling media type buttons |

## Testing Tips

Use the **Controls** panel to test different states:

1. **Test sorting**: Change \`currentSort.sortField\` to 'title' or 'year', and toggle \`sortOrder\` between 1 and -1
2. **Test filtering**: Set \`currentSort.searchTerm\` to any value
3. **Test media type**: Set \`currentSort.mediaType\` to 'movie', 'series', 'game', or leave undefined for 'all'

Watch the icons and buttons update in real-time as you modify the Controls!

## Design Notes

- **Sort toggle**: Clicking the same field twice reverses direction (1 ↔ -1)
- **Initial state**: \`All\` media type is checked by default
- **Filter timing**: Emits on every keystroke (parent should implement debounce ~300ms)
- **Icon feedback**: Changes based on current sort state
        `,
      },
    },
  },
  argTypes: {
    currentSort: {
      description:
        'Current filter/sort state from parent. Controls visible state of icons and buttons.',
      control: { type: 'object' },
      table: {
        type: { summary: 'FavoritesSearchParams' },
      },
    },
    sortChange: {
      description: 'Emitted when user clicks sort field icons',
      action: 'sortChange',
      table: {
        type: { summary: 'EventEmitter<{field: string, order: number}>' },
      },
    },
    filterChange: {
      description: 'Emitted when user types in filter input',
      action: 'filterChange',
      table: {
        type: { summary: 'EventEmitter<string>' },
      },
    },
    mediaTypeChange: {
      description: 'Emitted when user toggles media type buttons',
      action: 'mediaTypeChange',
      table: {
        type: { summary: 'EventEmitter<string>' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<SortingControlsComponent>;

export const Default: Story = {
  args: {
    currentSort: {
      currentPage: 1,
      pageSize: 10,
      sortField: undefined,
      sortOrder: undefined,
      mediaType: undefined,
      searchTerm: undefined,
    },
  },
};
