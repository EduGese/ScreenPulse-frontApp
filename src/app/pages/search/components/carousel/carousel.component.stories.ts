import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CarouselComponent } from './carousel.component';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { action } from '@storybook/addon-actions';
import { FEATURED_MEDIA } from 'src/app/core/constants/featured-media.const';

const sampleData = FEATURED_MEDIA;

const meta: Meta<CarouselComponent> = {
    title: 'Pages/Search/Components/Carousel',
    component: CarouselComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [
                CommonModule,
                NgbCarouselModule
            ],
            declarations: [CarouselComponent],
        }),
    ],
    parameters: {
        layout: 'centered',
        story: {
            inline: false  
        },
        docs: {
            description: {
                component: `
Displays a **carousel of media items** grouped into slides using ng-bootstrap.

## Features

- 🎠 Auto-rotating carousel with 4-second intervals
- 📸 Groups items into slides of 4 items each
- ♿ Fully accessible with ARIA labels and keyboard navigation
- 🖼️ Automatic fallback image on poster load errors
- 🎯 Emits events when user clicks on a media item

## Key Capabilities

The component provides an interactive carousel with:
- **Automatic slide transitions** every 4 seconds
- **Navigation indicators** (dots) for manual slide selection
- **Keyboard accessible** poster images with Enter/Space handlers
- **Performance optimized** with trackBy functions
- **Responsive grouping** that adapts to collection size

## Usage Example

### Template (HTML)

\`\`\`html
<app-carousel
  [collection]="mediaItems"
  (sendItemCarousel)="openMediaItem($event)">
</app-carousel>
\`\`\`

### Component (TypeScript)

\`\`\`typescript
export class SearchComponent {
  mediaItems: MediaItem[] = [];

  @Output() sendItemCarousel = new EventEmitter<MediaItem>();


  onOpenItem(item: MediaItem) {
    this.sendItemCarousel.emit(item);
  }
}
\`\`\`

## Grouping Logic

Items are automatically grouped into slides of **4 items each**:

- Collection with 8 items → 2 slides (4 + 4)
- Collection with 10 items → 3 slides (4 + 4 + 2)
- Collection with 3 items → 1 slide (3)

## Accessibility Features

- **ARIA labels**: Carousel has \`role="region"\` and \`aria-label\`
- **Keyboard navigation**: Images support Enter and Space key activation
- **Focus management**: All interactive elements are keyboard accessible
- **Alt text**: Each image has descriptive alt text from media title

## Performance Optimization

The component uses **trackBy functions** for optimal rendering:

\`\`\`typescript
// Slide-level tracking (by index)
trackByFn(index: number): number {
  return index;
}

// Item-level tracking (by unique ID)
trackByItem(index: number, item: MediaItem): string {
  return item.imdbID;
}
\`\`\`

This prevents unnecessary DOM re-renders when the collection updates.

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| \`sendItemCarousel\` | \`MediaItem\` | Emitted when user clicks on a media item poster |
      `,
            },
        },
    },
    argTypes: {
        collection: {
            control: 'object',
            description: 'Array of media items to display in the carousel',
        },
        sendItemCarousel: {
            action: 'sendItemCarousel'
        },
    },
};

export default meta;
type Story = StoryObj<CarouselComponent>;

export const Default: Story = {
    args: {
        collection: sampleData,
        sendItemCarousel: action('sendItemCarousel'),
    },
    argTypes: {
        collection: { control: 'object' }, 
    },
};

export const SmallCollection: Story = {
    args: {
        collection: sampleData.slice(0, 3),
        sendItemCarousel: action('sendItemCarousel'),
    },
    argTypes: {
        collection: { control: false },
    },
    parameters: {
        docs: {
            description: {
                story: 'Carousel with only 3 items (single slide).',
            },
        },
    },
};

export const LargeCollection: Story = {
    args: {
        collection: [...sampleData, ...sampleData],
        sendItemCarousel: action('sendItemCarousel'),
    },
    argTypes: {
        collection: { control: false },
    },
    parameters: {
        docs: {
            description: {
                story: 'Carousel with 16 items (4 slides of 4 items each).',
            },
        },
    },
};