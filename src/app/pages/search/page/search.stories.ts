import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { SearchComponent } from './search.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { MediaItemResultsTableComponent } from '../components/movie-results-table/movie-results-table.component';
import { SearchCoverComponent } from '../components/search-cover/search-cover.component';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { OmdbService } from 'src/app/shared/services/omdb/omdb.service';
import { FavoritesService } from 'src/app/shared/services/favorites/favorites.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of } from 'rxjs';



class MockOmdbService {
    fetchMediaItems() { return of({ Response: "False" }); }
    getMediaItemInfo() { return of({}); }
}
class MockOmdbServiceWithResults {
    fetchMediaItems() {
        return of({
            Response: "True",
            Search: [
                {
                    title: "The Matrix",
                    year: "1999",
                    imdbID: "tt0133093",
                    type: "movie",
                    poster: "https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_SX300.jpg"
                },
                {
                    title: "The Matrix Reloaded",
                    year: "2003",
                    imdbID: "tt0234215",
                    type: "movie",
                    poster: "https://m.media-amazon.com/images/M/MV5BNjAxYjkxNjktYTU0YS00NjFhLWIyMDEtMzEzMTJjMzRkMzQ1XkEyXkFqcGc@._V1_SX300.jpg"
                },
                {
                    title: "The Matrix Revolutions",
                    year: "2003",
                    imdbID: "tt0242653",
                    type: "movie",
                    poster: "https://m.media-amazon.com/images/M/MV5BMmNmMTEzODQtNmExMS00OGUxLWFkNTItMTM3NzBlNDk0YWU5XkEyXkFqcGc@._V1_SX300.jpg"
                },
                {
                    title: "The Matrix Resurrections",
                    year: "2021",
                    imdbID: "tt10838180",
                    type: "movie",
                    poster: "https://m.media-amazon.com/images/M/MV5BMDMyNDIzYzMtZTMyMy00NjUyLWI3Y2MtYzYzOGE1NzQ1MTBiXkEyXkFqcGc@._V1_SX300.jpg"
                },
                {
                    title: "Making 'The Matrix'",
                    year: "1999",
                    imdbID: "tt0365467",
                    type: "movie",
                    poster: "https://m.media-amazon.com/images/M/MV5BOTZjYThlYjktMzI1Ny00ZTQ1LWEzYTYtMTQ2NzU5ZDc1MGIwXkEyXkFqcGc@._V1_SX300.jpg"
                },
                {
                    title: "The Matrix Revisited",
                    year: "2001",
                    imdbID: "tt0295432",
                    type: "movie",
                    poster: "https://m.media-amazon.com/images/M/MV5BMTkzNjg3NjE4N15BMl5BanBnXkFtZTgwNTc3NTAwNzE@._V1_SX300.jpg"
                },
                {
                    title: "Enter the Matrix",
                    year: "2003",
                    imdbID: "tt0277828",
                    type: "game",
                    poster: "https://m.media-amazon.com/images/M/MV5BNWM3MDU2MWQtYjdlNC00NDBlLTkyNGMtNjdhYjdlNTdiNTFlXkEyXkFqcGdeQXVyNTEwNDY2MjU@._V1_SX300.jpg"
                },
                {
                    title: "A Glitch in the Matrix",
                    year: "2021",
                    imdbID: "tt9847360",
                    type: "movie",
                    poster: "https://m.media-amazon.com/images/M/MV5BYmU0NzFhYmEtMmUzNC00MjQ1LTg3NTctZDdlZmVlY2MzMDQzXkEyXkFqcGc@._V1_SX300.jpg"
                },
                {
                    title: "The Matrix: Path of Neo",
                    year: "2005",
                    imdbID: "tt0451118",
                    type: "game",
                    poster: "https://m.media-amazon.com/images/M/MV5BZGFiNGU4MjEtODM2ZC00OTg0LThkNmEtZTBlN2FkMmFjOWYzXkEyXkFqcGdeQXVyNTEwNDY2MjU@._V1_SX300.jpg"
                },
                {
                    title: "Armitage III: Dual Matrix",
                    year: "2002",
                    imdbID: "tt0303678",
                    type: "movie",
                    poster: "https://m.media-amazon.com/images/M/MV5BOTUwOTY3Mjg1MF5BMl5BanBnXkFtZTcwODI2MTAyMQ@@._V1_SX300.jpg"
                }
            ],
            totalResults: "10"
        });
    }

    getMediaItemInfo() { /* empty */ }
}

class MockFavoritesService {
    addToFavorites() { return of({}); }
}

class MockAuthService {
    isLoggedInObservable() { return of(true); }
}

class MockDialogService {
    openMediaItem() { return of(undefined); }
    openTrailerDialog() { /* empty */ }
}

class MockToastrService {
    success() { /* empty */ }
    warning() { /* empty */ }
    error() { /* empty */ }
}

class MockRouter {
    navigate() { return Promise.resolve(true); }
}

const meta: Meta<SearchComponent> = {
    title: 'Pages/Search/Page/SearchPage',
    component: SearchComponent,
    tags: ['autodocs'],

    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                provideHttpClient(),
                { provide: OmdbService, useClass: MockOmdbService },
                { provide: FavoritesService, useClass: MockFavoritesService },
                { provide: AuthService, useClass: MockAuthService },
                { provide: DialogService, useClass: MockDialogService },
                { provide: ToastrService, useClass: MockToastrService },
                { provide: Router, useClass: MockRouter }
            ]
        }),
        moduleMetadata({
            declarations: [
                SearchComponent,
                SearchBarComponent,
                MediaItemResultsTableComponent,
                SearchCoverComponent,
                LoadingSpinnerComponent,
                CarouselComponent
            ],
            imports: [
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatSelectModule,
                MatButtonModule,
                MatIconModule,
                MatTableModule,
                MatPaginatorModule,
                MatSortModule,
                MatProgressBarModule,
                MatDialogModule,
                NgbModule,
                NgbCarouselModule
            ]
        })
    ],

    parameters: {
        layout: 'fullscreen',
        viewport: {
            defaultViewport: 'laptop'
        },
        controls: {
            disable: true
        },
        actions: {
            disable: true
        },
        docs: {
            description: {
                component: `

 
Container component handling media search and discovery flows with full service integration.

## Component Type

** Smart Component** - Manages search state, API calls, authentication checks, and child component orchestration.

## Features

- 🔍 ** Search functionality**: Title, type, and year filters
- 📡 ** Service integration **:
    - OmdbService for external API calls(search / details)
    - DialogService for modal dialogs(media details / trailers)
    - FavoritesService for adding items to user collection
    - AuthService for authentication checks
- ⏳ ** Loading states **: Visual feedback during API requests
- 🎨 ** Toast notifications **: Success / error feedback via ngx - toastr
- 📄 ** Pagination **: Handles large result sets with page navigation
- 🔐 ** Auth - protected actions **: Redirects to login when needed
- 🎬 ** Featured media **: Carousel of highlighted content on page load

## Child Components

- ** SearchBarComponent **: Presentational search form(filters + validation)
- ** MediaItemResultsTableComponent **: Results display with pagination
- ** SearchCoverComponent **: Hero section with title
- ** LoadingSpinnerComponent **: Visual loading indicator
- ** CarouselComponent **: Featured media showcase

## Service Dependencies

### OmdbService
- \`fetchMediaItems(title, type, year, page)\`: GET external OMDB API
  - Request: Query parameters (title, type, year, page)
  - Returns: SearchResponse { Response, Search[], totalResults }
  - On success: Updates searchState.collection + collectionSize
  - On error: Toast error + empty results

- \`getMediaItemInfo(imdbID)\`: GET detailed media information
  - Request: imdbID string
  - Returns: MediaItemDetails (title, plot, rating, trailer, etc.)
  - Used by: DialogService for modal content

### DialogService
- \`openMediaItem(windowWidth, mediaItem, fromFavorites)\`: Opens details modal
  - Lazy loads MediaItemDialogComponent
  - Fetches full details via OmdbService
  - Returns: Observable<void>
  - On success: Modal displayed with media info + trailer
  
- \`openTrailerDialog(videoUrl)\`: Opens YouTube trailer modal
  - Lazy loads TrailerDialogComponent
  - Embeds YouTube video with autoplay

### FavoritesService
- \`addToFavorites(mediaItem: MediaItem)\`: POST /api/favorites
  - Request: MediaItem { title, year, imdbID, type, poster }
  - Returns: Success confirmation
  - On success: Toast "Added to favorites"
  - On error: Toast error message

### AuthService
- \`isLoggedInObservable()\`: Observable<boolean> of auth state
  - Checks: sessionStorage token presence
  - Emits: true if logged in, false otherwise
  - Used by: addToFavorites() for auth gate

### ToastrService
- Toast notifications for:
  - Search success
  - Search errors
  - Favorites added
  - Auth warnings ("You must be logged in...")

### Router
- Navigation to:
  - \`/auth/login\` when user not authenticated (favorites action)

## Data Flow

\`\`\`
Page Load
    ↓
SearchComponent.ngOnInit()
    ↓
Featured media displayed (FEATURED_MEDIA constant)
    ↓
User fills SearchBarComponent
    ↓
User submits form (@Output searchFilters: SearchFilters)
    ↓
SearchComponent.handleSubmit(filters: SearchFilters)
    ↓
1. searchState updated:
   - searchState.title = filters.title
   - searchState.type = filters.type
   - searchState.year = filters.year
   - searchState.currentPage = 1
   - searchState.searchOnProcess = true (spinner shows)
    ↓
2. fetchMediaItems() (private method)
    ↓
3. OmdbService.fetchMediaItems() → External API call
    ↓
Success:
  1. OmdbService returns SearchResponse
  2. searchState.collection = response.Search
  3. searchState.collectionSize = response.totalResults
  4. searchState.searchOnProcess = false (spinner hides)
  5. MediaItemResultsTableComponent renders results
  6. Focus moved to results table
    ↓
Error:
  1. Toast: error message
  2. searchState.collection = []
  3. searchState.searchOnProcess = false
  4. Form remains enabled for retry

---

User clicks "Add to Favorites" on result
    ↓
SearchComponent.addToFavorites(mediaItem: MediaItem)
    ↓
1. AuthService.isLoggedInObservable() checks auth
    ↓
Not Logged In:
  - Toast: "You must be logged in..."
  - Router.navigate(['/auth/login'])
    ↓
Logged In:
  - FavoritesService.addToFavorites(mediaItem)
  - Toast: "{item.title} Added to favorites"

---

User clicks result row (poster or title)
    ↓
SearchComponent.openMediaItem(mediaItem: MediaItem)
    ↓
1. loadingCard = true (loading state)
2. DialogService.openMediaItem(window.innerWidth, mediaItem, false)
    ↓
3. DialogService fetches OmdbService.getMediaItemInfo(imdbID)
    ↓
4. Lazy loads MediaItemDialogComponent
    ↓
5. Modal displayed with:
   - Full plot
   - IMDb rating
   - Genre, Director, Actors
   - Play trailer button (if available)
    ↓
6. loadingCard = false (finalize operator)

---

User clicks pagination (page 2)
    ↓
SearchComponent.loadPage(page: number)
    ↓
1. searchState.currentPage = page
2. fetchMediaItems() called again
3. Same flow as initial search (spinner + API + results)
\`\`\`

## Type Safety

### State Type
- **SearchState**: Internal component state
  - title: string (search query)
  - type: string ('movie' | 'series' | 'game' | 'all')
  - year: string (release year filter, optional)
  - currentPage: number (pagination, starts at 1)
  - pageSize: number (results per page, fixed at 10)
  - collection: MediaItem[] (search results)
  - collectionSize: number (total results from API)
  - searchOnProcess: boolean (loading state flag)

### Request Type
- **SearchFilters**: User input from SearchBarComponent
  - title: string (required, min 3 chars)
  - type: string (required, dropdown selection)
  - year: string (optional, 4 digits)

### Response Type
- **SearchResponse**: OMDB API search endpoint response
  - Response: string ("True" | "False")
  - Search?: MediaItem[] (array of results, if Response="True")
  - totalResults?: string (total count as string, if Response="True")
  - Error?: string (error message, if Response="False")

- **MediaItem**: Individual search result
  - Title: string (movie/series/game title)
  - Year: string (release year)
  - imdbID: string (unique identifier)
  - Type: string (content type)
  - Poster: string (poster image URL or "N/A")

- **MediaItemDetails**: Full media information from OMDB
  - All MediaItem fields plus:
  - Plot: string (full description)
  - imdbRating: string (rating out of 10)
  - Genre: string (comma-separated genres)
  - Director: string (director name)
  - Actors: string (comma-separated actors)
  - youtubeURLTrailer?: string (YouTube video URL, if available)

## Error Handling

- No results found → Warning toast + empty state
- API timeout → Error toast + retry option
- Invalid search (empty title) → Form validation prevents submit
- Network error → Error toast + form enabled for retry
- Auth required (favorites) → Warning toast + redirect to login
- Dialog load error → Error toast + loadingCard reset
- searchOnProcess reset prevents duplicate API calls

## Public API

### Properties

| Property | Type | Description |
|---|---|---|
| \`featuredMedia\` | \`MediaItem[]\` | Featured media items displayed on page load (FEATURED_MEDIA constant) |
| \`displayedColumns\` | \`string[]\` | Table columns: \`['title', 'year', 'type', 'poster', 'Add']\` |
| \`searchState\` | \`SearchState\` | Current search state (filters, results, pagination, loading) |

### Methods

| Method | Signature | Description |
|---|---|---|
| \`handleSubmit()\` | \`(filters: SearchFilters) => void\` | Processes search form submission, triggers API call |
| \`loadPage()\` | \`(page: number) => void\` | Loads specific page of results (pagination handler) |
| \`addToFavorites()\` | \`(mediaItem: MediaItem) => void\` | Adds item to favorites with auth check |
| \`openMediaItem()\` | \`(mediaItem: MediaItem) => void\` | Opens details dialog with full information |
| \`formSearchFocus()\` | \`() => void\` | Programmatically focuses on search input |

## Usage

This component is accessed via Angular routing:

\`\`\`typescript
{
  path: 'search',
  component: SearchComponent
}
\`\`\`

**Note**: Due to its container nature with complex state management and multiple service dependencies, detailed component interactions are best experienced in the running application. Individual child components have fully interactive Storybook stories with comprehensive state documentation.

**👉 Navigate to child component stories for detailed interactions:**
- \`Components/SearchBar\` for form variations and validation states
- \`Components/MediaItemResultsTable\` for results display and pagination
- \`Components/LoadingSpinner\` for loading state visual
- \`Components/SearchCover\` for hero section
- \`Components/Carousel\` for featured media showcase
`
            }
        }
    },
    argTypes: {
        loadingCard: {
            table: { disable: true }
        },
        SearchComponent: {
            table: { disable: true }
        },
        featuredMedia: {
            control: false,
            description: 'Featured media items displayed on page load',
            table: {
                type: { summary: 'MediaItem[]' },
                category: 'State',
                defaultValue: { summary: 'FEATURED_MEDIA constant' }
            }
        },
        displayedColumns: {
            control: false,
            description: 'Columns displayed in search results table',
            table: {
                type: { summary: 'string[]' },
                category: 'Configuration',
                defaultValue: { summary: "['title', 'year', 'type', 'poster', 'Add']" }
            }
        },

        searchState: {
            control: false,
            description: 'Current search state (filters, results, pagination)',
            table: {
                type: { summary: 'SearchState' },
                category: 'State',
                defaultValue: {
                    summary: '{ title: "", type: "all", year: "", currentPage: 1, pageSize: 10, collection: [], collectionSize: 0, searchOnProcess: false }'
                }
            }
        },
        handleSubmit: {
            control: false,
            description: 'Processes search form submission',
            table: {
                type: { summary: '(filters: SearchFilters) => void' },
                category: 'Methods'
            }
        },

        loadPage: {
            control: false,
            description: 'Loads specific page of results',
            table: {
                type: { summary: '(page: number) => void' },
                category: 'Methods'
            }
        },

        addToFavorites: {
            control: false,
            description: 'Adds media item to favorites (auth required)',
            table: {
                type: { summary: '(mediaItem: MediaItem) => void' },
                category: 'Methods'
            }
        },

        openMediaItem: {
            control: false,
            description: 'Opens media details dialog',
            table: {
                type: { summary: '(mediaItem: MediaItem) => void' },
                category: 'Methods'
            }
        },
        formSearchFocus: {
            control: false,
            description: 'Focuses on search input programmatically',
            table: {
                type: { summary: '() => void' },
                category: 'Methods'
            }
        }
    },
};

export default meta;
type Story = StoryObj<SearchComponent>;

/**
 * Default Search Page
 * 
 * Shows the page structure with all components in their initial state.
 * For detailed interactions, see individual component stories.
 */
export const Default: Story = {
    parameters: {
        layout: 'fullscreen',
        viewport: {
            defaultViewport: 'laptop'
        },

        docs: {
            description: {
                story: 'Search page in Laptop viewport (1366px)'
            }
        }
    }
};

export const SearchWithResults: Story = {
    parameters: {
        layout: 'fullscreen',
        viewport: {
            defaultViewport: 'laptop'
        },
        docs: {
            description: {
                story: `

Demonstrates SearchComponent's search and results table display with mock data.

**🎯 How to Use:**
1. Enter "Matrix" in the search field
2. Select "movie" from the type dropdown
3. Click Submit button
4. Results table will appear below

**What You'll See:**
- Search form with filters (title, type, year)
- Results table with 10 mock items from The Matrix franchise
- Material table with pagination footer

**Mock Data:**
OmdbService returns predefined Matrix movies and games for any search query.

**Note**: This story shows the page layout and search flow only. Dialog interactions are mocked and not displayed.

**Viewport**: Laptop (1024px)
        `
            }
        }
    },
    decorators: [
        applicationConfig({
            providers: [
                { provide: OmdbService, useClass: MockOmdbServiceWithResults },
            ]
        }),
    ]
};

