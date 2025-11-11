import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FavoritesCardComponent } from './favorites-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { MediaItem } from 'src/app/shared/models/movie.model';


const mockMediaItem: MediaItem = {
    _id: '68f60ea3476a3d94a82c6bbd',
    imdbID: 'tt0462499',
    title: 'Rambo',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTI5Mjg1MzM4NF5BMl5BanBnXkFtZTcwNTAyNzUzMw@@._V1_SX300.jpg',
    year: '2008',
    type: 'movie',
    description: '',
};

const mockMediaItemWithNote: MediaItem = {
    ...mockMediaItem,
    description: 'Masterpiece of sci-fi cinema. Highly recommended for mind-bending plot.',
};

const meta: Meta<FavoritesCardComponent> = {
    title: 'Pages/Favorites/Components/FavoritesCard',
    component: FavoritesCardComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [
                CommonModule,
                MatCardModule,
                MatIconModule,
                MatButtonModule,
                MatTooltipModule,
                NgbModule,
            ],
            declarations: [FavoritesCardComponent],
        }),
    ],
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'dark background',
            values: [{ name: 'dark background', value: '#000000' }],
        },
        controls: {
            include: ['item', 'itemToDelete', 'itemToOpen', 'descriptionToAdd', 'descriptionToDelete'],
        },
        docs: {
            description: {
                component: `
# Favorites Card Component

**Component Type:** Presentational Component (Dumb Component)

Complex card component for displaying media items with dual-mode interface (view/edition).

## Features

- 👁️ **View Mode**: Poster display with media type chip and optional user notes
- ✏️ **Edition Mode**: Full controls for adding/editing/deleting notes and removing items
- 📱 **Responsive**: Auto-activates edition mode on mobile/tablet (≤1024px)
- 🎨 **Media Type Badges**: Color-coded chips (🔴 Red=Movie, 🟡 Yellow=Series, 🟢 Green=Game)
- 💬 **Tooltips**: Title hover + note preview in view mode
- ⌨️ **Accessibility**: Keyboard navigation (Enter/Space to open item)
- 🎬 **Animations**: Smooth slide-up animation for edition mode

## Dual-Mode Architecture

### View Mode (Default)

\`\`\`
┌─────────────────────┐
│  Poster Image       │
│  (Hover on desktop) │
├─────────────────────┤
│  Media Type Chip    │
│  Year + Note Button │
└─────────────────────┘
\`\`\`

**Behaviors:**
- Shows poster with 120% zoom on hover (desktop only)
- Note button appears only if description exists
- Click anywhere on card opens item detail
- Tooltip shows full title on hover

### Edition Mode (Activated by button or mobile)

\`\`\`
┌─────────────────────┐
│  Delete Button      │
│  Edit/Close Button  │
├─────────────────────┤
│  Add Note Button    │
│  Delete Note Button │
├─────────────────────┤
│  Textarea (200 char)│
│  Review Input Area  │
├─────────────────────┤
│  Media Type Chip    │
│  Year               │
└─────────────────────┘
\`\`\`

**Behaviors:**
- Full overlay with animation
- Add/update/delete review functionality
- Delete item button (warn color)
- Close/back button to return to view mode

## Responsive Breakpoints

| Viewport | Buttons Visible | Mode |
|----------|-----------------|------|
| ≥801px (Desktop) | On hover only | View (default) |
| 801px to 1024px (Tablet) | Always visible | View (default) + Edition accessible |
| ≤1024px (Mobile) | Always visible | View (default) + Edition accessible |

## Data Flow

### Input

\`\`\`typescript
@Input() item: MediaItem = {
  _id: string;
  title: string;
  poster: string;
  year: number;
  type: 'movie' | 'series' | 'game';
  description?: string;  // User's note/review
}
\`\`\`

### Outputs

| Event | Payload | When |
|-------|---------|------|
| \`itemToDelete\` | \`string (_id)\` | Delete button clicked |
| \`itemToOpen\` | \`MediaItem\` | Card/poster clicked |
| \`descriptionToAdd\` | \`MediaItem (with description)\` | Save note button clicked |
| \`descriptionToDelete\` | \`MediaItem (description: '')\` | Delete note button clicked |

## Component State

### Public Properties

- \`mode\`: 'view' \\| 'edition' - Current display mode
- \`item\`: MediaItem - Card data (from @Input)

### Private State

- \`backgroundUrl\`: URL of poster image
- \`inputDescription\`: Temporary textarea content
- \`hoverState\`: Desktop hover state
- \`viewportWidth\`: Window width for responsive logic

## Key Methods

### areButtonsVisible()

Determines if delete/edit buttons should display:

\`\`\`typescript
areButtonsVisible(): boolean {
  // Always show on mobile/tablet (≤1024px)
  if (this.viewportWidth <= 1024) return true;
  // Show on desktop only when hovering
  return this.hoverState;
}
\`\`\`

### toggleMode(event)

Switch between view and edition modes with event stopping to prevent card click.

### onDescriptionToAdd()

Emit updated item with user's note and reset to view mode.

### setDefaultBackground()

Handle missing poster images with fallback asset.

## Styling

### Color Scheme

- **Background**: Pure black (#000000)
- **Media Type Chips**:
  - Movie: Red (rgb(255, 0, 0))
  - Series: Yellow (rgb(255, 255, 0))
  - Game: Green (rgb(0, 128, 0))
- **Accent**: Amber (#f5cf3d) for notes button

### Responsive Layout

- Card width: flex 1 1 160px (max 200px)
- Poster: 115px × 165px
- Textarea: 115px width, 330px height (in edition mode)

## Animation

**Edition mode slide-up**: 1.2s duration, fills screen height from 100px to 160px+

## Accessibility

- Tooltip for full title (matTooltip)
- Keyboard support (Enter/Space to open item)
- Semantic role="button" on poster div
- aria-label on action buttons
- Stop propagation on button clicks

## Parent Integration

Parent component should:

1. Provide MediaItem array as input
2. Subscribe to four @Output events
3. Handle item deletion, opening details, note management
4. Update item list after operations

Example:

\`\`\`html
<div class="favorites-grid">
  <app-favorites-card 
    *ngFor="let item of favoriteItems"
    [item]="item"
    (itemToDelete)="onDelete($event)"
    (itemToOpen)="onOpen($event)"
    (descriptionToAdd)="onAddNote($event)"
    (descriptionToDelete)="onDeleteNote($event)">
  </app-favorites-card>
</div>
\`\`\`

## Known Behaviors

- **Poster load error**: Falls back to default image (/assets/images/no_poster.jpg)
- **Long descriptions**: Truncated to 200 characters max in textarea
- **Mobile responsiveness**: Window resize not tracked (uses viewport size on init)
- **Tooltip timing**: Uses default Material tooltip delay (200ms)
        `,
            },
        },
    },
    argTypes: {
        item: {
            description: 'Media item data to display',
            control: { type: 'object' },
            table: {
                type: { summary: 'MediaItem' },
            },
        },
        initialHoverstate: {
            description: 'Initial display mode (for testing/Storybook only)',
            control: { type: 'radio' },
            options: [true, false],
            table: {
                category: 'Testing',
                type: { summary: 'true | false' },
                defaultValue: { summary: "'view'" },
            },
            docs: { disable: true },
        },
        itemToDelete: {
           control: { disable: true }
        },
        itemToOpen: {
           control: { disable: true }
        },
        descriptionToAdd: {
            control: { disable: true }
        },
        descriptionToDelete: {
            control: { disable: true }
        },
    },
};

export default meta;
type Story = StoryObj<FavoritesCardComponent>;

/**
 * Default state: Movie without user note
 * 
 * Shows view mode with:
 * - Movie poster image
 * - Red "MOVIE" type chip
 * - Year display
 * - No notes button (no description)
 * - Edit button appears on hover (desktop) or always visible (mobile)
 */
export const Default: Story = {
    args: {
        item: mockMediaItem,
        initialHoverstate: false
    },
    parameters: {
        viewport: {
            defaultViewport: 'laptop',
        },
    },
};

/**
 * Card with user note/review
 * 
 * Demonstrates:
 * - Poster display
 * - "Notes" button visible in view mode (description exists)
 * - Tooltip shows truncated note on button hover
 * - Yellow highlight for amber accent
 */
export const WithNote: Story = {
    args: {
        item: mockMediaItemWithNote,
        initialHoverstate: false
    },
    parameters: {
        viewport: {
            defaultViewport: 'laptop',
        },
    },
};

/**
 * Series item (yellow chip)
 * 
 * Shows series-specific styling:
 * - Yellow media type chip (rgb(255, 255, 0))
 * - "SERIES" label
 * - Same functionality as movie
 */
export const Series: Story = {
    args: {
        item: {
            ...mockMediaItem,
            title: 'Breaking Bad',
            type: 'series',
            poster: 'https://m.media-amazon.com/images/M/MV5BMzU5ZGYzNmQtMTdhYy00OGRiLTg0NmQtYjVjNzliZTg1ZGE4XkEyXkFqcGc@._V1_SX300.jpg',
        },
        initialHoverstate: false
    },
    parameters: {
        viewport: {
            defaultViewport: 'laptop',
        },
    },
};

/**
 * Video game item (green chip)
 * 
 * Shows game-specific styling:
 * - Green media type chip (rgb(0, 128, 0))
 * - "GAME" label
 * - Same functionality as movie/series
 */
export const Game: Story = {
    args: {
        item: {
            ...mockMediaItem,
            title: 'The Last of Us',
            type: 'game',
            year: "2013",
            poster: 'https://via.placeholder.com/115x165?text=The+Last+of+Us',
        },
        initialHoverstate: false
    },
    parameters: {
        viewport: {
            defaultViewport: 'laptop',
        },
    },
};

/**
 * Missing poster image fallback
 * 
 * When poster URL fails to load:
 * - Falls back to default image (/assets/images/no_poster.jpg)
 * - Functionality remains intact
 * - User experience preserved
 */
export const NoPoster: Story = {
    args: {
        item: {
            ...mockMediaItem,
            poster: 'https://invalid-url.com/poster.jpg',
        },
        initialHoverstate: false
    },
    parameters: {
        viewport: {
            defaultViewport: 'laptop',
        },
    },
};

/**
 * Mobile viewport (375px)
 * 
 * Demonstrates responsive behavior:
 * - Edit/delete buttons ALWAYS visible (not hover-dependent)
 * - Card optimized for touch
 * - Edition mode easily accessible
 */
export const MobileView: Story = {
    args: {
        item: mockMediaItem,
        initialHoverstate: true,
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile',
        },
    },

};

/**
 * Tablet viewport (768px)
 * 
 * Demonstrates tablet responsiveness:
 * - Buttons visible for easier touch interaction
 * - Edition mode accessible
 * - Better touch targets than mobile
 */
export const TabletView: Story = {
    args: {
        item: mockMediaItem,
        initialHoverstate: true
    },
    parameters: {
        viewport: {
            defaultViewport: 'tablet',
        },
    },
};


