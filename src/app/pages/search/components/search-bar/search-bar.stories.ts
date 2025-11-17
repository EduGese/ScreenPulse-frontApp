import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { SearchBarComponent } from './search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<SearchBarComponent> = {
  title: 'Pages/Search/Components/SearchBar',
  component: SearchBarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      declarations: [SearchBarComponent],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'app background',
      values: [
        { name: 'app background', value: '#1a1a1a' }
      ],
    },
    controls: {
      include: ['searchSubmitted'],
    },
    docs: {
      description: {
        component: `
Search bar component for filtering movies, series, and games.

## Features

- 🔍 Search by title, type, and year
- ✅ Reactive form validation with pattern matching
- 📱 Responsive Material Design layout
- 🎯 Multiple validation error messages
- 🧹 Clear form functionality
- 📍 External focus control via public method

## Key Capabilities

The component provides a comprehensive search interface:
- **Title validation** prevents leading spaces and empty inputs
- **Year range validation** limits input between 1900 and current year
- **Type filtering** supports movies, series, games, or all
- **Flexible API** with public focusSearchInput() method
- **Type-safe form handling** with SearchFormValue interface

## Usage Example

### Basic Implementation

\`\`\`html
<app-search-bar
  (searchSubmitted)="handleSearch($event)">
</app-search-bar>
\`\`\`

### With External Focus Control

\`\`\`html
<app-search-bar
  #searchBar
  (searchSubmitted)="handleSearch($event)">
</app-search-bar>

<button (click)="searchBar.focusSearchInput()">
  Go to search
</button>
\`\`\`

### Component (TypeScript)

\`\`\`typescript
export class SearchComponent {
  @ViewChild(SearchBarComponent) searchBar!: SearchBarComponent;

  handleSearch(filters: SearchFilters): void {
    this.searchService.searchMedia(filters).subscribe(
      (results) => this.displayResults(results),
      (error) => this.showError(error)
    );
  }

  scrollToSearch(): void {
    this.searchBar.focusSearchInput();
  }
}
\`\`\`

## Form Validation

| Field | Rules | Error Messages |
|-------|-------|----------------|
| **Title** | Required, no leading spaces | "Required field" or "Title cannot start with spaces or be only spaces" |
| **Type** | One of: movie, series, game, all | N/A (select dropdown) |
| **Year** | Optional, min 1900, max current year | "Must be between 1900-{currentYear}" |

## SearchFilters Interface

\`\`\`typescript
interface SearchFilters {
  title: string;
  type: MediaType; // 'movie' | 'series' | 'game' | 'all'
  year: string; // Empty string if not provided
}
\`\`\`

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| \`searchSubmitted\` | \`SearchFilters\` | Emitted when form is submitted with valid values |


## Accessibility

- ✅ ARIA labels on all form fields
- ✅ Clear error messages for each validation rule
- ✅ Keyboard accessible controls
- ✅ Proper label associations with inputs
- ✅ Smooth scroll behavior for focus control
- ✅ Visual feedback for invalid states

## Component Architecture

This component is designed to work within a responsive layout:

- **Desktop (>992px)**: Takes ~1/3 of width (flex: 1), alongside gallery (flex: 2)
- **Tablet (602px-992px)**: Vertical stack (column), below gallery
- **Mobile (<602px)**: Vertical stack, 100% width with padding
        `,
      },
    },
  },
  argTypes: {
    // ✅ SOLO mostrar searchSubmitted
    searchSubmitted: {
      action: 'searchSubmitted',
      description: 'Emitted when search form is submitted with valid filters',
    },
    // ❌ Excluir todo lo demás
    searchForm: {
      table: { disable: true }
    },
    types: {
      table: { disable: true }
    },
    currentYear: {
      table: { disable: true }
    },
    searchFormFocus: {
      table: { disable: true }
    },
    handleSubmit: {
      table: { disable: true }
    },
    handleClear: {
      table: { disable: true }
    }
  },
};

export default meta;
type Story = StoryObj<SearchBarComponent>;

// ════════════════════════════════════════════════════════════
// ✨ DEFAULT: Isolated / Standalone Mode
// ════════════════════════════════════════════════════════════
export const Default: Story = {
  render: () => ({
    props: {
      onSearchSubmitted: action('searchSubmitted')
    },
    template: `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1a1a1a;
        padding: 40px 20px;
        min-height: 100vh;
        font-family: Roboto, Arial, sans-serif;
      ">
        <div style="width: 100%; max-width: 500px;">
          <app-search-bar
            (searchSubmitted)="onSearchSubmitted($event)">
          </app-search-bar>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
Isolated/standalone mode with component centered at max-width 500px.

Useful for testing, debugging, or when using SearchBar independently.
        `,
      },
    },
  },
};

// ════════════════════════════════════════════════════════════
// 🎯 DESKTOP: Principal Context - Like in Production
// ════════════════════════════════════════════════════════════
export const Desktop: Story = {
  render: () => ({
    props: {
      onSearchSubmitted: action('searchSubmitted')
    },
    template: `
      <div style="
        display: flex;
        align-items: center;
        gap: 20px;
        background-color: #1a1a1a;
        padding: 20px;
        min-height: 100vh;
        font-family: Roboto, Arial, sans-serif;
      ">
        <!-- Gallery/Results Container (2/3 width) -->
        <div style="
          flex: 4;
          background-color: #000000;
          border: 1px solid #444;
          border-radius: 8px;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        ">
          <p style="
            color: #888;
            text-align: center;
            font-size: 14px;
            margin: 0;
          ">
            📹 Gallery / Search Results Content
            <br>
            <span style="font-size: 12px; color: #666;">(2/3 of width)</span>
          </p>
        </div>

        <!-- SearchBar: 1/3 width -->
        <div style="flex: 1; min-width: 300px;">
          <app-search-bar
            (searchSubmitted)="onSearchSubmitted($event)">
          </app-search-bar>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
Desktop layout (1920px+): SearchBar takes ~1/3 width, gallery takes ~2/3.

This is the primary layout and most realistic view of how it works in production.
        `,
      },
    },
    viewport: {
      defaultViewport: 'iphone12',
    },
  },
};

// ════════════════════════════════════════════════════════════
// 📱 TABLET: Responsive Layout
// ════════════════════════════════════════════════════════════
export const Tablet: Story = {
  render: () => ({
    props: {
      onSearchSubmitted: action('searchSubmitted')
    },
    template: `
      <div style="
        display: flex;
        flex-direction: column;
        gap: 20px;
        background-color: #1a1a1a;
        padding: 20px;
        min-height: 100vh;
        font-family: Roboto, Arial, sans-serif;
      ">
        <!-- Gallery/Results Container -->
        <div style="
          flex: 1;
          background-color: #000000;
          border: 1px solid #444;
          border-radius: 8px;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 200px;
        ">
          <p style="
            color: #888;
            text-align: center;
            font-size: 14px;
            margin: 0;
          ">
            📹 Gallery Content
          </p>
        </div>

        <!-- SearchBar: centered in column -->
        <div style="
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
        ">
          <app-search-bar
            (searchSubmitted)="onSearchSubmitted($event)">
          </app-search-bar>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
Tablet layout (768px - 992px): SearchBar is placed below gallery in column layout.

Component is centered with max-width 500px and respects SCSS breakpoints.
        `,
      },
    },
    viewport: {
      defaultViewport: 'ipad',
    },
  },
};

// ════════════════════════════════════════════════════════════
// 📱 MOBILE: Responsive Layout
// ════════════════════════════════════════════════════════════
export const Mobile: Story = {
  render: () => ({
    props: {
      onSearchSubmitted: action('searchSubmitted')
    },
    template: `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1a1a1a;
        padding: 40px 20px;
        min-height: 100vh;
        font-family: Roboto, Arial, sans-serif;
      ">
        <div style="width: 100%; max-width: 250px; max-higth;">
          <app-search-bar
            (searchSubmitted)="onSearchSubmitted($event)">
          </app-search-bar>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
Mobile layout (375px - 601px): SearchBar takes 100% width.

On small mobile devices, SearchBar is the primary visible element.
Results/gallery render below (below the fold).
        `,
      },
    },
    viewport: {
      defaultViewport: 'iphone12',
    },
  },
};

// ════════════════════════════════════════════════════════════
// 🎨 WITH VALID INPUT: Interactive Example
// ════════════════════════════════════════════════════════════
export const WithValidInput: Story = {
  render: () => ({
    props: {
      onSearchSubmitted: action('searchSubmitted')
    },
    template: `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1a1a1a;
        padding: 40px 20px;
        min-height: 100vh;
        font-family: Roboto, Arial, sans-serif;
      ">
        <div style="width: 100%; max-width: 500px;">
          <app-search-bar
            (searchSubmitted)="onSearchSubmitted($event)">
          </app-search-bar>
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const titleInput = canvasElement.querySelector(
      'input[formcontrolname="title"]'
    ) as HTMLInputElement;

    if (titleInput) {
      titleInput.value = 'Inception';
      titleInput.dispatchEvent(new Event('input', { bubbles: true }));
      titleInput.dispatchEvent(new Event('blur', { bubbles: true }));
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
Interactive example with form pre-filled with valid data.

Demonstrates how the component looks with valid data ready to submit.
Try clicking the "Find" button to see the action logged.
        `,
      },
    },
  },
};

// ════════════════════════════════════════════════════════════
// ⚠️ WITH VALIDATION ERROR: Error State Example
// ════════════════════════════════════════════════════════════
export const WithValidationError: Story = {
  render: () => ({
    props: {
      onSearchSubmitted: action('searchSubmitted')
    },
    template: `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1a1a1a;
        padding: 40px 20px;
        min-height: 100vh;
        font-family: Roboto, Arial, sans-serif;
      ">
        <div style="width: 100%; max-width: 500px;">
          <app-search-bar
            (searchSubmitted)="onSearchSubmitted($event)">
          </app-search-bar>
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const titleInput = canvasElement.querySelector(
      'input[formcontrolname="title"]'
    ) as HTMLInputElement;

    if (titleInput) {
      titleInput.value = '   '; // Only spaces - invalid
      titleInput.dispatchEvent(new Event('input', { bubbles: true }));
      titleInput.dispatchEvent(new Event('blur', { bubbles: true }));
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
Validation error example: title field has only spaces (invalid).

Shows how component validates and displays specific error messages.
        `,
      },
    },
  },
};
