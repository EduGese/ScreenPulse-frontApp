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

const sampleData =  [
        {
            "title": "Batman Begins",
            "year": "2005",
            "imdbID": "tt0372784",
            "type": "movie",
            "poster": "https://m.media-amazon.com/images/M/MV5BODIyMDdhNTgtNDlmOC00MjUxLWE2NDItODA5MTdkNzY3ZTdhXkEyXkFqcGc@._V1_SX300.jpg"
        },
        {
            "title": "The Batman",
            "year": "2022",
            "imdbID": "tt1877830",
            "type": "movie",
            "poster": "https://m.media-amazon.com/images/M/MV5BMmU5NGJlMzAtMGNmOC00YjJjLTgyMzUtNjAyYmE4Njg5YWMyXkEyXkFqcGc@._V1_SX300.jpg"
        },
        {
            "title": "Batman v Superman: Dawn of Justice",
            "year": "2016",
            "imdbID": "tt2975590",
            "type": "movie",
            "poster": "https://m.media-amazon.com/images/M/MV5BZTJkYjdmYjYtOGMyNC00ZGU1LThkY2ItYTc1OTVlMmE2YWY1XkEyXkFqcGc@._V1_SX300.jpg"
        },
        {
            "title": "Batman v Superman: Dawn of Justice",
            "year": "2016",
            "imdbID": "tt2975590",
            "type": "movie",
            "poster": "https://m.media-amazon.com/images/M/MV5BZTJkYjdmYjYtOGMyNC00ZGU1LThkY2ItYTc1OTVlMmE2YWY1XkEyXkFqcGc@._V1_SX300.jpg"
        },
        {
            "title": "Batman",
            "year": "1989",
            "imdbID": "tt0096895",
            "type": "movie",
            "poster": "https://m.media-amazon.com/images/M/MV5BYzZmZWViM2EtNzhlMi00NzBlLWE0MWEtZDFjMjk3YjIyNTBhXkEyXkFqcGc@._V1_SX300.jpg"
        },
        {
            "title": "Batman Returns",
            "year": "1992",
            "imdbID": "tt0103776",
            "type": "movie",
            "poster": "https://m.media-amazon.com/images/M/MV5BZTliMDVkYTktZDdlMS00NTAwLWJhNzYtMWIwMDZjN2ViMGFiXkEyXkFqcGc@._V1_SX300.jpg"
        },
        {
            "title": "Batman & Robin",
            "year": "1997",
            "imdbID": "tt0118688",
            "type": "movie",
            "poster": "https://m.media-amazon.com/images/M/MV5BYzU3ZjE3M2UtM2E4Ni00MDI5LTkyZGUtOTFkMGIyYjNjZGU3XkEyXkFqcGc@._V1_SX300.jpg"
        },
        {
            "title": "Batman Forever",
            "year": "1995",
            "imdbID": "tt0112462",
            "type": "movie",
            "poster": "https://m.media-amazon.com/images/M/MV5BMTUyNjJhZWItMTZkNS00NDc4LTllNjUtYTg3NjczMzA5ZTViXkEyXkFqcGc@._V1_SX300.jpg"
        },
        {
            "title": "The Lego Batman Movie",
            "year": "2017",
            "imdbID": "tt4116284",
            "type": "movie",
            "poster": "https://m.media-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_SX300.jpg"
        },
        {
            "title": "Batman: The Animated Series",
            "year": "1992–1995",
            "imdbID": "tt0103359",
            "type": "series",
            "poster": "https://m.media-amazon.com/images/M/MV5BYjgwZWUzMzUtYTFkNi00MzM0LWFkMWUtMDViMjMxNGIxNDUxXkEyXkFqcGc@._V1_SX300.jpg"
        }
    ]

const meta: Meta<MediaItemResultsTableComponent> = {
  title: 'Pages/Search/Components/MediaItemResultsTable',
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
 [displayedColumns]="displayedColumns"
 [collection]="searchState.collection"
 [collectionSize]="searchState.collectionSize"
 [currentPage]="searchState.currentPage"
 [pageSize]="searchState.pageSize"
 (pageChanged)="loadPage($event)"
 (detailsOpened)="openMediaItem($event)"
 (favoriteAdded)="addToFavorites($event)">
</app-movie-results-table>
\`\`\`

### Component (TypeScript)

\`\`\`typescript
export class SearchComponent {
  
  displayedColumns: string[] = ['title', 'year', 'type', 'poster', 'Add'];
  
  searchState: SearchState = {
    currentPage: 1,
    pageSize: 10,
    collection: [],
    collectionSize: 0,
  };

  constructor(private mediaService: MediaService) {}

  /**
   * Called when user clicks pagination buttons
   * Fetch new page from API and update table data
   */
  loadPage(pageNumber: number): void {
    this.searchState.currentPage = pageNumber;
    this.fetchMediaItems();
  }

  /**
   * Called when user clicks on a poster image
   */
  openMediaItem(item: MediaItem): void {
    // Parent component handles navigation/dialog logic
  }

  /**
   * Called when user clicks favorite button
   */
  addToFavorites(item: MediaItem): void {
    // Parent component handles add to favorites logic
  }

  /**
   * Internal: Fetch media items from API
   * Updates collection and collectionSize for table display
   */
  private fetchMediaItems(): void {
    this.mediaService.getItems(
      this.searchState.currentPage,
      this.searchState.pageSize
    ).subscribe(response => {
      this.searchState.collection = response.items;
      this.searchState.collectionSize = response.total;
    });
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

export const WithManyItems: Story = {
  name: 'Many items (Pagination Enabled)',
  args: {
    collection: sampleData.slice(0, 5),
    collectionSize: 20,
    currentPage: 1,
    pageSize: 5,
    displayedColumns: ['title', 'year', 'type', 'poster', 'Add'],
    favoriteAdded: action('favoriteAdded'),
    detailsOpened: action('detailsOpened'),
    pageChanged: action('pageChanged'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with pagination enabled. Try clicking next/previous buttons - pageChanged event will be emitted in Actions tab.',
      },
    },
  },
};

export const NoPagination: Story = {
  name: 'Few Items (Pagination Disabled)',
  args: {
    collection: sampleData.slice(0, 3), 
    collectionSize: 3,
    currentPage: 1,
    pageSize: 10,  
    displayedColumns: ['title', 'year', 'type', 'poster', 'Add'],
    favoriteAdded: action('favoriteAdded'),
    detailsOpened: action('detailsOpened'),
    pageChanged: action('pageChanged'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with few items. Paginator is automatically hidden when all items fit in one page (collection size ≤ page size).',
      },
    },
  },
};


export const EmptyTable: Story = {
  name: 'Empty Results (No Items)',
  args: {
    collection: [],  
    collectionSize: 0,
    currentPage: 1,
    pageSize: 5,
    displayedColumns: ['title', 'year', 'type', 'poster', 'Add'],
    favoriteAdded: action('favoriteAdded'),
    detailsOpened: action('detailsOpened'),
    pageChanged: action('pageChanged'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty table state when no search results are found. Shows table structure with no data rows.',
      },
    },
  },
};





