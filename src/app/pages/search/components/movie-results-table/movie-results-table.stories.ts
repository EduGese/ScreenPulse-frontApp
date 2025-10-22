import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { MediaItemResultsTableComponent } from './movie-results-table.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { action } from '@storybook/addon-actions';
import { MatButtonModule } from '@angular/material/button';

const sampleData = [
  {
    title: 'Batman Begins',
    year: '2005',
    imdbID: 'tt0372784',
    type: 'movie',
    poster: 'https://m.media-amazon.com/images/M/MV5BODIyMDdhNTgtNDlmOC00MjUxLWE2NDItODA5MTdkNzY3ZTdhXkEyXkFqcGc@._V1_SX300.jpg'
  },
  {
    title: 'The Batman',
    year: '2022',
    imdbID: 'tt1877830',
    type: 'movie',
    poster: 'https://m.media-amazon.com/images/M/MV5BMmU5NGJlMzAtMGNmOC00YjJjLTgyMzUtNjAyYmE4Njg5YWMyXkEyXkFqcGc@._V1_SX300.jpg'
  },
  {
    title: 'Batman v Superman: Dawn of Justice',
    year: '2016',
    imdbID: 'tt2975590',
    type: 'movie',
    poster: 'https://m.media-amazon.com/images/M/MV5BZTJkYjdmYjYtOGMyNC00ZGU1LThkY2ItYTc1OTVlMmE2YWY1XkEyXkFqcGc@._V1_SX300.jpg'
  },
  {
    title: 'Batman Returns',
    year: '1992',
    imdbID: 'tt0103776',
    type: 'movie',
    poster: 'https://m.media-amazon.com/images/M/MV5BZTliMDVkYTktZDdlMS00NTAwLWJhNzYtMWIwMDZjN2ViMGFiXkEyXkFqcGc@._V1_SX300.jpg'
  },
  {
    title: 'Batman & Robin',
    year: '1997',
    imdbID: 'tt0118688',
    type: 'movie',
    poster: 'https://m.media-amazon.com/images/M/MV5BYzU3ZjE3M2UtM2E4Ni00MDI5LTkyZGUtOTFkMGIyYjNjZGU3XkEyXkFqcGc@._V1_SX300.jpg'
  }
];

const meta: Meta<MediaItemResultsTableComponent> = {
  title: 'Search/Components/MediaItemResultsTable',
  component: MediaItemResultsTableComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatButtonModule,
        BrowserAnimationsModule,
      ],
      declarations: [MediaItemResultsTableComponent],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Displays a **Material Design styled table** for listing media items such as movies, series, or videogames.

## Features

- 📋 Displays columns for **title**, **year**, **type**, **poster**, and an add favorite button
- 🔄 Supports **sorting** and **pagination** using MatSort and MatPaginator
- 🎯 Emits events on favorite item addition, item detail opening, and page changes

## Key Capabilities

The component provides a fully interactive table with:
- **Client-side sorting** on all columns (title, year, type)
- **Server-side pagination** support with page change events
- **Clickable poster images** that trigger detail views
- **Favorite button** for each item with Material icon

## Usage Example

### Template (HTML)

\`\`\`html
<app-movie-results-table
  [collection]="mediaItems"
  [collectionSize]="totalCount"
  [currentPage]="currentPage"
  [pageSize]="pageSize"
  [displayedColumns]="['poster', 'title', 'year', 'type', 'Add']"
  (favoriteAdded)="addToFavorites($event)"
  (detailsOpened)="openDetails($event)"
  (pageChanged)="onPageChange($event)">
</app-movie-results-table>
\`\`\`

### Component (TypeScript)

\`\`\`typescript
export class MyComponent {
  mediaItems: MediaItem[] = [];
  totalCount = 100;
  currentPage = 1;
  pageSize = 10;

  addToFavorites(item: MediaItem) {
    console.log('Added to favorites:', item);
    this.favoritesService.add(item);
  }

  openDetails(item: MediaItem) {
    this.router.navigate(['/details', item.imdbID]);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadItems(page);
  }
}
\`\`\`

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| \`favoriteAdded\` | \`MediaItem\` | Emitted when user clicks the favorite button |
| \`detailsOpened\` | \`MediaItem\` | Emitted when user clicks on a poster image |
| \`pageChanged\` | \`number\` | Emitted when user changes the paginator page |
      `,
      },
    },
  },
  argTypes: {
    favoriteAdded: { action: 'favoriteAdded' },
    detailsOpened: { action: 'detailsOpened' },
    pageChanged: { action: 'pageChanged' },
  },
};

export default meta;
type Story = StoryObj<MediaItemResultsTableComponent>;

export const Default: Story = {
  args: {
    collection: sampleData,
    collectionSize: sampleData.length,
    currentPage: 1,
    pageSize: 5,
    displayedColumns: ['poster', 'title', 'year', 'type', 'Add'],
    favoriteAdded: action('favoriteAdded'),
    detailsOpened: action('detailsOpened'),
    pageChanged: action('pageChanged'),
  },
  argTypes: {
    favoriteAdded: { action: 'favoriteAdded' },
    detailsOpened: { action: 'detailsOpened' },
    pageChanged: { action: 'pageChanged' },
  },
};
