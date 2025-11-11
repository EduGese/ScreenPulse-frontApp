import { MediaItem } from './../../../shared/models/movie.model';
import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { FavoritesComponent } from './favorites.component';
import { SortingControlsComponent } from '../components/sorting-controls/sorting-controls.component';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { FavoritesService } from 'src/app/shared/services/favorites/favorites.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { FavoritesCardComponent } from '../components/favorites-card/favorites-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


class MockAuthService {
  isLoggedInObservable() {
    return of(true); 
  }

  getUserName() {
    return 'John Doe'; 
  }

  getAuthToken() {
    return 'mock-jwt-token';
  }
}


class MockFavoritesServiceEmpty {
  getFavorites() {
    return of({
      favorites: [],
      totalFavorites: 0,
      currentPage: 1,
      pageSize: 10
    });
  }

  deleteMediaItem() {
    return of({ message: 'Item deleted successfully' });
  }

  updateFavorite(mediaItem: MediaItem) {
    return of(mediaItem);
  }
}

class MockFavoritesServiceWithData {
  getFavorites(page = 1, pageSize = 10) {
    const allFavorites: MediaItem[] = [
      {
        _id: "6911c2f9ab83a6fe7085de9d",
        title: "Dune",
        year: "2021",
        imdbID: "tt1160419",
        type: "movie",
        poster: "https://m.media-amazon.com/images/M/MV5BMDQ0NjgyN2YtNWViNS00YjA3LTkxNDktYzFkZTExZGMxZDkxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
        createdAt: "2025-11-10T10:48:25.491Z",
        updatedAt: "2025-11-10T10:48:25.491Z",
        description: "Impresive"
      },
      {
        _id: "6913035307e4c3e022d062a7",
        title: "Breaking Bad",
        year: "2008–2013",
        imdbID: "tt0903747",
        type: "series",
        poster: "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg",
        createdAt: "2025-11-11T09:35:15.019Z",
        updatedAt: "2025-11-11T09:35:15.019Z",
        description: ""
      },
      {
        _id: "691303ac07e4c3e022d062bb",
        title: "Call of Duty: Black Ops",
        year: "2010",
        imdbID: "tt1632479",
        type: "game",
        poster: "https://m.media-amazon.com/images/M/MV5BMzViNGUwNmMtYjUxYS00NDgyLWJjNmUtOGY4NmI4ODUzOTc3XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
        createdAt: "2025-11-11T09:36:44.980Z",
        updatedAt: "2025-11-11T09:36:44.980Z",
        description: ""
      },
      {
        _id: "6911c200ab83a6fe7085ddbf",
        title: "Master and Commander: The Far Side of the World",
        year: "2003",
        imdbID: "tt0311113",
        type: "movie",
        poster: "https://m.media-amazon.com/images/M/MV5BZDEzYmZmOTYtMzdlYS00MWNjLWE2YjEtMzkyZTMyOWZjMjkyXkEyXkFqcGc@._V1_SX300.jpg",
        createdAt: "2025-11-10T10:44:16.084Z",
        updatedAt: "2025-11-10T10:44:16.084Z",
        description: ""
      },
      {
        _id: "6913034207e4c3e022d062a2",
        title: "True Detective",
        year: "2014–",
        imdbID: "tt2356777",
        type: "series",
        poster: "https://m.media-amazon.com/images/M/MV5BYjgwYzA1NWMtNDYyZi00ZGQyLWI5NTktMDYwZjE2OTIwZWEwXkEyXkFqcGc@._V1_SX300.jpg",
        createdAt: "2025-11-11T09:34:58.858Z",
        updatedAt: "2025-11-11T09:34:58.858Z",
        description: ""
      },
      {
        _id: "6913037307e4c3e022d062b1",
        title: "World of Warcraft: Wrath of the Lich King",
        year: "2008",
        imdbID: "tt1227192",
        type: "game",
        poster: "https://m.media-amazon.com/images/M/MV5BMTAwMTM0NDU5MjFeQTJeQWpwZ15BbWU4MDA5NzMxNDEx._V1_SX300.jpg",
        createdAt: "2025-11-11T09:35:47.189Z",
        updatedAt: "2025-11-11T09:35:47.189Z",
        description: ""
      },
      {
        _id: "68f113fe8fefeb950adba6a9",
        title: "RoboCop",
        year: "1987",
        imdbID: "tt0093870",
        type: "movie",
        poster: "https://m.media-amazon.com/images/M/MV5BZWM1YzRhODktZDE1MC00NzBlLTk0NGMtOGNhZDQyMmJiZGFiXkEyXkFqcGc@._V1_SX300.jpg",
        createdAt: "2025-10-16T15:49:18.924Z",
        updatedAt: "2025-11-03T17:24:40.839Z",
        description: "Old, but gold"
      },
      {
        _id: "6913035907e4c3e022d062ac",
        title: "MobLand",
        year: "2025–",
        imdbID: "tt31510819",
        type: "series",
        poster: "https://m.media-amazon.com/images/M/MV5BZDVmMzJkOWUtMjdjMi00NzA4LTgxMTItYjA4NjVjZDI0ZWU1XkEyXkFqcGc@._V1_SX300.jpg",
        createdAt: "2025-11-11T09:35:21.529Z",
        updatedAt: "2025-11-11T09:35:21.529Z",
        description: ""
      },
      {
        _id: "691303ab07e4c3e022d062b6",
        title: "Call of Duty: Modern Warfare 2",
        year: "2009",
        imdbID: "tt1450746",
        type: "game",
        poster: "https://m.media-amazon.com/images/M/MV5BZWEzOTA4MTktNGM2Mi00NTMwLWEzZjctYjU2OWFkNjVmY2YxXkEyXkFqcGdeQXVyMzM2MzI5MzU@._V1_SX300.jpg",
        createdAt: "2025-11-11T09:36:43.274Z",
        updatedAt: "2025-11-11T09:36:43.274Z",
        description: ""
      },
      {
        _id: "6911c201ab83a6fe7085ddc4",
        title: "Seeking a Friend for the End of the World",
        year: "2012",
        imdbID: "tt1307068",
        type: "movie",
        poster: "https://m.media-amazon.com/images/M/MV5BNDgxYzQ5ZGYtZDAyMS00MWNiLWIwMWMtZmIwODUwODFhYjdlXkEyXkFqcGc@._V1_SX300.jpg",
        createdAt: "2025-11-10T10:44:17.579Z",
        updatedAt: "2025-11-10T10:44:17.579Z",
        description: ""
      }
    ];

    return of({
      favorites: allFavorites.slice((page - 1) * pageSize, page * pageSize),
      totalFavorites: allFavorites.length,
      currentPage: page,
      pageSize: pageSize
    });
  }

  deleteMediaItem() {

    return of({ message: 'Item deleted successfully' });
  }

  updateFavorite(mediaItem: MediaItem) {
    return of(mediaItem);
  }
}

class MockFavoritesServiceWithPagination {
  getFavorites(page = 1, pageSize = 10) {
    const allFavorites: MediaItem[] = [
      {
        _id: "6911c2f9ab83a6fe7085de9d",
        title: "Dune",
        year: "2021",
        imdbID: "tt1160419",
        type: "movie",
        poster: "https://m.media-amazon.com/images/M/MV5BMDQ0NjgyN2YtNWViNS00YjA3LTkxNDktYzFkZTExZGMxZDkxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
        createdAt: "2025-11-10T10:48:25.491Z",
        updatedAt: "2025-11-10T10:48:25.491Z",
        description: "Impresive"
      },
      {
        _id: "6913035307e4c3e022d062a7",
        title: "Breaking Bad",
        year: "2008–2013",
        imdbID: "tt0903747",
        type: "series",
        poster: "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg",
        createdAt: "2025-11-11T09:35:15.019Z",
        updatedAt: "2025-11-11T09:35:15.019Z",
        description: ""
      },
      {
        _id: "691303ac07e4c3e022d062bb",
        title: "Call of Duty: Black Ops",
        year: "2010",
        imdbID: "tt1632479",
        type: "game",
        poster: "https://m.media-amazon.com/images/M/MV5BMzViNGUwNmMtYjUxYS00NDgyLWJjNmUtOGY4NmI4ODUzOTc3XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
        createdAt: "2025-11-11T09:36:44.980Z",
        updatedAt: "2025-11-11T09:36:44.980Z",
        description: ""
      },
      {
        _id: "6911c200ab83a6fe7085ddbf",
        title: "Master and Commander: The Far Side of the World",
        year: "2003",
        imdbID: "tt0311113",
        type: "movie",
        poster: "https://m.media-amazon.com/images/M/MV5BZDEzYmZmOTYtMzdlYS00MWNjLWE2YjEtMzkyZTMyOWZjMjkyXkEyXkFqcGc@._V1_SX300.jpg",
        createdAt: "2025-11-10T10:44:16.084Z",
        updatedAt: "2025-11-10T10:44:16.084Z",
        description: ""
      },
      {
        _id: "6913034207e4c3e022d062a2",
        title: "True Detective",
        year: "2014–",
        imdbID: "tt2356777",
        type: "series",
        poster: "https://m.media-amazon.com/images/M/MV5BYjgwYzA1NWMtNDYyZi00ZGQyLWI5NTktMDYwZjE2OTIwZWEwXkEyXkFqcGc@._V1_SX300.jpg",
        createdAt: "2025-11-11T09:34:58.858Z",
        updatedAt: "2025-11-11T09:34:58.858Z",
        description: ""
      },
      {
        _id: "6913037307e4c3e022d062b1",
        title: "World of Warcraft: Wrath of the Lich King",
        year: "2008",
        imdbID: "tt1227192",
        type: "game",
        poster: "https://m.media-amazon.com/images/M/MV5BMTAwMTM0NDU5MjFeQTJeQWpwZ15BbWU4MDA5NzMxNDEx._V1_SX300.jpg",
        createdAt: "2025-11-11T09:35:47.189Z",
        updatedAt: "2025-11-11T09:35:47.189Z",
        description: ""
      },
      {
        _id: "68f113fe8fefeb950adba6a9",
        title: "RoboCop",
        year: "1987",
        imdbID: "tt0093870",
        type: "movie",
        poster: "https://m.media-amazon.com/images/M/MV5BZWM1YzRhODktZDE1MC00NzBlLTk0NGMtOGNhZDQyMmJiZGFiXkEyXkFqcGc@._V1_SX300.jpg",
        createdAt: "2025-10-16T15:49:18.924Z",
        updatedAt: "2025-11-03T17:24:40.839Z",
        description: "Old, but gold"
      },
      {
        _id: "6913035907e4c3e022d062ac",
        title: "MobLand",
        year: "2025–",
        imdbID: "tt31510819",
        type: "series",
        poster: "https://m.media-amazon.com/images/M/MV5BZDVmMzJkOWUtMjdjMi00NzA4LTgxMTItYjA4NjVjZDI0ZWU1XkEyXkFqcGc@._V1_SX300.jpg",
        createdAt: "2025-11-11T09:35:21.529Z",
        updatedAt: "2025-11-11T09:35:21.529Z",
        description: ""
      },
      {
        _id: "691303ab07e4c3e022d062b6",
        title: "Call of Duty: Modern Warfare 2",
        year: "2009",
        imdbID: "tt1450746",
        type: "game",
        poster: "https://m.media-amazon.com/images/M/MV5BZWEzOTA4MTktNGM2Mi00NTMwLWEzZjctYjU2OWFkNjVmY2YxXkEyXkFqcGdeQXVyMzM2MzI5MzU@._V1_SX300.jpg",
        createdAt: "2025-11-11T09:36:43.274Z",
        updatedAt: "2025-11-11T09:36:43.274Z",
        description: ""
      },
      {
        _id: "6911c201ab83a6fe7085ddc4",
        title: "Seeking a Friend for the End of the World",
        year: "2012",
        imdbID: "tt1307068",
        type: "movie",
        poster: "https://m.media-amazon.com/images/M/MV5BNDgxYzQ5ZGYtZDAyMS00MWNiLWIwMWMtZmIwODUwODFhYjdlXkEyXkFqcGc@._V1_SX300.jpg",
        createdAt: "2025-11-10T10:44:17.579Z",
        updatedAt: "2025-11-10T10:44:17.579Z",
        description: ""
      },
      {
        _id: "689cd11d260f95dd34e4f744",
        title: "Inception",
        year: "2010",
        imdbID: "tt1375666",
        type: "movie",
        poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        createdAt: "2025-08-13T17:53:33.874Z",
        updatedAt: "2025-08-13T17:53:33.874Z",
        description: ""
      },
      {
        _id: "684beeaadaf3ba2df8a3d32d",
        title: "Salto al vacío",
        year: "1995",
        imdbID: "tt0111058",
        type: "movie",
        poster: "https://m.media-amazon.com/images/M/MV5BNDE3OTBhYjktMmUzZi00ZGMwLWI4MjAtMjUzNGM4NWYwNjYwXkEyXkFqcGdeQXVyMTA0MjU0Ng@@._V1_SX300.jpg",
        createdAt: "2025-06-13T09:26:02.666Z",
        updatedAt: "2025-10-04T18:57:09.268Z",
        description: "Wonderful!"
      },
      {
        _id: "6847f9acf8a5c5ba5138bf2b",
        title: "Ali G Indahouse",
        year: "2002",
        imdbID: "tt0284837",
        type: "movie",
        poster: "https://m.media-amazon.com/images/M/MV5BYjg2NzAxMzYtNDRlZS00ZjQ3LWE4YWItMDBmZWUxYjdiZDQ5XkEyXkFqcGc@._V1_SX300.jpg",
        createdAt: "2025-06-10T09:23:56.951Z",
        updatedAt: "2025-10-04T18:57:18.215Z",
        description: ""
      },
      {
        _id: "680a27b5546059c139995857",
        title: "The Batman",
        year: "2022",
        imdbID: "tt1877830",
        type: "movie",
        poster: "https://m.media-amazon.com/images/M/MV5BMmU5NGJlMzAtMGNmOC00YjJjLTgyMzUtNjAyYmE4Njg5YWMyXkEyXkFqcGc@._V1_SX300.jpg",
        createdAt: "2025-04-24T11:59:49.249Z",
        updatedAt: "2025-04-24T11:59:49.249Z",
        description: ""
      },
      {
        _id: "680a02040f48e65d4dce3b76",
        title: "Aliens vs. Predator: Requiem",
        year: "2007",
        imdbID: "tt0758730",
        type: "movie",
        poster: "https://m.media-amazon.com/images/M/MV5BYWVhYTlmNTAtNTk5ZS00MWYzLWFkZmYtOWE3YTZlYmFkYThjXkEyXkFqcGc@._V1_SX300.jpg",
        createdAt: "2025-04-24T09:19:00.200Z",
        updatedAt: "2025-06-11T11:09:20.761Z",
        description: ""
      },
      {
        _id: "680a02000f48e65d4dce3b71",
        title: "Requiem for a Dream",
        year: "2000",
        imdbID: "tt0180093",
        type: "movie",
        poster: "https://m.media-amazon.com/images/M/MV5BN2ZlMjIzZjctYzA2My00ZWYyLWI4ZjctMGI2NWYyNzFiZjAwXkEyXkFqcGc@._V1_SX300.jpg",
        createdAt: "2025-04-24T09:18:56.573Z",
        updatedAt: "2025-04-24T11:57:21.674Z",
        description: ""
      },
      {
        _id: "6807cd840136b747c0f9dc12",
        title: "Rambo: First Blood Part II",
        year: "1985",
        imdbID: "tt0089880",
        type: "movie",
        poster: "https://m.media-amazon.com/images/M/MV5BNTNiMzUyZjQtY2RlOS00MjIxLWFlMjAtNjI1NjkzY2JjN2M3XkEyXkFqcGc@._V1_SX300.jpg",
        createdAt: "2025-04-22T17:10:28.262Z",
        updatedAt: "2025-04-24T07:08:26.809Z",
        description: "A classic!"
      },
      {
        _id: "68075efdf7b61d11b7cb8d81",
        title: "Fargo",
        year: "2014–2024",
        imdbID: "tt2802850",
        type: "series",
        poster: "https://m.media-amazon.com/images/M/MV5BMjMzMTIzMTUwN15BMl5BanBnXkFtZTgwNjE0NTg0MTE@._V1_SX300.jpg",
        createdAt: "2025-04-22T09:18:53.007Z",
        updatedAt: "2025-04-23T16:30:14.781Z",
        description: ""
      },
      {
        _id: "68075efbf7b61d11b7cb8d7c",
        title: "Fargo",
        year: "1996",
        imdbID: "tt0116282",
        type: "movie",
        poster: "https://m.media-amazon.com/images/M/MV5BNjg4MWE0MjEtODFhNy00MjA5LTg5ODktMzgwNWFmZTAwNjBlXkEyXkFqcGc@._V1_SX300.jpg",
        createdAt: "2025-04-22T09:18:51.690Z",
        updatedAt: "2025-04-23T16:44:48.991Z",
        description: ""
      }
    ];

    return of({
      favorites: allFavorites.slice((page - 1) * pageSize, page * pageSize),
      totalFavorites: allFavorites.length,
      currentPage: page,
      pageSize: pageSize
    });
  }

  deleteMediaItem() {
    return of({ message: 'Item deleted successfully' });
  }

  updateFavorite(mediaItem: MediaItem) {
    return of(mediaItem);
  }
}


class MockDialogService {
  openMediaItem() {
    return of(undefined);
  }

  openTrailerDialog() {
    // Empty
  }
}


class MockToastrService {
  success() { /* Empty */ }
  warning() { /* Empty */ }
  error() { /* Empty */ }
}


const meta: Meta<FavoritesComponent> = {
  title: 'Pages/Favorites/Page/FavoritesPage',
  component: FavoritesComponent,
  tags: ['autodocs'],

  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        provideHttpClient(),
        { provide: AuthService, useClass: MockAuthService },
        { provide: FavoritesService, useClass: MockFavoritesServiceEmpty },
        { provide: DialogService, useClass: MockDialogService },
        { provide: ToastrService, useClass: MockToastrService }
      ]
    }),
    moduleMetadata({
      declarations: [
        FavoritesComponent,
        SortingControlsComponent,
        FavoritesCardComponent,
        EmptyStateComponent,
        LoadingSpinnerComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatMenuModule,
        MatCardModule,
        MatProgressBarModule,
        MatButtonToggleModule,
        MatTooltipModule,
        NgbModule

      ]
    })
  ],

  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'laptop'
    },
    controls: { disable: true },
    actions: { disable: true },

    docs: {
      description: {
        component: `
Container component handling user's favorites collection with full CRUD operations.

## Component Type

**Smart Component** - Manages favorites state, API calls, authentication checks, and child component orchestration.

## Features

- 📚 **Favorites management**: View, filter, sort, and manage saved media items
- 🔐 **Auth-protected**: Requires login (AuthGuard), displays user name
- 📡 **Service integration**:
  - FavoritesService for backend API calls (CRUD operations)
  - DialogService for media details modal
  - AuthService for user session management
- ⏳ **Loading states**: Visual feedback for async operations
- 🎨 **Toast notifications**: Success/error feedback via ngx-toastr
- 📄 **Pagination**: Server-side pagination with Material paginator
- 🔍 **Search & filter**: Real-time filtering by title and media type
- 🔄 **Sorting**: Sort by title, year, or date added
- ✏️ **CRUD operations**: Create (from search), Read, Update (description), Delete

## Child Components

- **SortingControlsComponent**: Search input, media type filter, sort dropdown
- **FavoritesCardComponent**: Individual favorite card with actions (open, edit, delete)
- **EmptyStateComponent**: Displayed when no favorites exist
- **LoadingSpinnerComponent**: Loading indicator for async operations

## Service Dependencies

### FavoritesService
- \`getFavorites(page, pageSize, sortField, sortOrder, searchTerm, mediaType)\`: GET /api/favorites
  - Request: Query parameters for pagination, sorting, filtering
  - Returns: FavoritesResponse { favorites[], totalFavorites, currentPage, pageSize }
  - On success: Updates favorites array + pagination state
  - On error: Toast error + loading state reset

- \`deleteMediaItem(_id)\`: DELETE /api/favorites/:id
  - Request: MongoDB _id of favorite to delete
  - Returns: { message: string }
  - On success: Optimistic UI update + toast confirmation
  - On error: Toast error + item remains in list

- \`updateFavorite(mediaItem)\`: PATCH /api/favorites/:id
  - Request: MediaItem with updated description
  - Returns: Updated MediaItem
  - On success: Update local array + toast confirmation
  - On error: Toast error + revert changes

### DialogService
- \`openMediaItem(windowWidth, mediaItem, fromFavorites)\`: Opens details modal
  - Lazy loads MediaItemDialogComponent
  - Fetches additional details via OmdbService
  - \`fromFavorites = true\` enables edit/delete actions in dialog
  - Returns: Observable<void>

### AuthService
- \`isLoggedInObservable()\`: Observable<boolean> of auth state
  - Checked by AuthGuard before route activation
  - Returns: true if user authenticated, false otherwise
  
- \`getUserName()\`: string | null
  - Retrieves user display name from session storage
  - Displayed in page title: "{userName}'s favorites collection"

### ToastrService
- Toast notifications for:
  - Favorites loaded successfully
  - Item deleted
  - Item updated
  - API errors
  - Auth warnings (handled by AuthGuard)

## Data Flow

\`\`\`
Route Navigation to /favorites
    ↓
AuthGuard.canActivate() checks auth
    ↓
Not Logged In:
  - Toast: "You must be logged in..."
  - Navigate to /auth/login
    ↓
Logged In:
  - Allow navigation
    ↓
FavoritesComponent.ngOnInit()
    ↓
1. isLoadingFavorites = true
2. loadAllFavorites() called
3. userName = AuthService.getUserName()
    ↓
FavoritesService.getFavorites(page, pageSize, ...)
    ↓
Success:
  1. favorites = response.favorites
  2. favoritesSize = response.totalFavorites
  3. isLoadingFavorites = false
  4. Render FavoritesCardComponent for each item
    ↓
Error:
  1. Toast: error message
  2. isLoadingFavorites = false
  3. Show error state

---

User changes filter (e.g., media type)
    ↓
SortingControlsComponent emits (mediaTypeChange)
    ↓
FavoritesComponent.onMediaTypeChange(mediaType)
    ↓
1. searchParams.mediaType = mediaType
2. searchParams.currentPage = 1 (reset pagination)
3. loadAllFavorites()
    ↓
API call with new filters → Results update

---

User clicks "Delete" on favorite card
    ↓
FavoritesCardComponent emits (itemToDelete)
    ↓
FavoritesComponent.deleteFavorite(_id)
    ↓
1. Optimistic update: favorites.filter(item => item._id !== _id)
2. favoritesSize decremented by 1 (instant paginator update)
3. FavoritesService.deleteMediaItem(_id)
    ↓
Success:
  - If page becomes empty:
    1. isRevalidatingAfterDelete = true
    2. currentPage = 1
    3. loadAllFavorites()
  - Toast: "Item deleted successfully"
    ↓
Error:
  - Toast: "Cannot delete item, try again later"
  - (Item remains removed from UI - optimistic update not rolled back)

---

User edits description on favorite card
    ↓
FavoritesCardComponent emits (descriptionToAdd)
    ↓
FavoritesComponent.updateFavorite(mediaItem)
    ↓
FavoritesService.updateFavorite(mediaItem)
    ↓
Success:
  1. Update local array with new description
  2. Toast: "Item updated"
    ↓
Error:
  - Toast: "Cannot update item, try again later"

---

User clicks pagination (page 2)
    ↓
MatPaginator emits (page) event
    ↓
FavoritesComponent.onPageChanged(event)
    ↓
1. searchParams.currentPage = event.pageIndex + 1
2. loadAllFavorites()
    ↓
API call with new page → Results update
\`\`\`

## Type Safety

### State Type
- **FavoritesSearchParams**: Search and pagination parameters
  - currentPage: number (starts at 1)
  - pageSize: number (default 10)
  - sortField?: string ('title' | 'year' | 'createdAt')
  - sortOrder?: number (1 for asc, -1 for desc)
  - searchTerm?: string (title filter)
  - mediaType?: string ('movie' | 'series' | 'game' | 'all')

### Response Type
- **FavoritesResponse**: API response from GET /api/favorites
  - favorites: MediaItem[] (paginated results)
  - totalFavorites: number (total count across all pages)
  - currentPage: number (current page number)
  - pageSize: number (items per page)

- **MediaItem**: Individual favorite item
  - _id: string (MongoDB ObjectId, required for CRUD operations)
  - title: string (media title)
  - year: string (release year)
  - imdbID: string (IMDB unique identifier)
  - type: string ('movie' | 'series' | 'game')
  - poster: string (poster image URL)
  - description?: string (user notes/description, optional)
  - user?: string (user ID who added this favorite)
  - createdAt?: string (ISO timestamp when added)
  - updatedAt?: string (ISO timestamp of last update)

## Error Handling

- Empty favorites → Show EmptyStateComponent (no error)
- API error on load → Toast error + loading state reset
- Delete error → Toast error + item remains removed (optimistic update)
- Update error → Toast error + description unchanged
- Network error → Toast error + retry available
- Auth error → Handled by AuthGuard (redirect to login)

## Key Implementation Details

### State Management
- Component maintains internal state for favorites collection
- All data loaded server-side (pagination, filtering, sorting)
- Loading states for async operations (initial load, delete, update)

### Optimistic Updates
- Delete operations update UI immediately before API confirmation
- \`favoritesSize\` decremented instantly for reactive paginator feedback
- No rollback on error (user must refresh page if delete fails)

### Pagination Behavior
- Server-side pagination with Material paginator component
- Page resets to 1 when filters/sort changes
- Empty page detection triggers automatic reload from page 1
- Paginator displays: "1-10 of 25" format with first/last/next/prev buttons

### Authentication Flow
- Route protected by AuthGuard (requires valid session token)
- User name retrieved from AuthService and displayed in page title
- Unauthenticated access redirects to /auth/login with warning toast

## Usage

This component is accessed via Angular routing with AuthGuard protection:

\`\`\`typescript
{
  path: 'favorites',
  canActivate: [AuthGuard], // ← Requires authentication
  component: FavoritesComponent
}
\`\`\`

**Auth Flow**:
1. User navigates to /favorites
2. AuthGuard checks AuthService.isLoggedInObservable()
3. If not logged in → Toast warning + redirect to /auth/login
4. If logged in → Allow navigation + component loads

**Note**: Due to its container nature with authentication requirements and complex state management, detailed component interactions are best experienced in the running application. Individual child components have fully interactive Storybook stories with comprehensive state documentation.

**👉 Navigate to child component stories for detailed interactions:**
- \`Components/SortingControls\` for filter/sort variations
- \`Components/FavoritesCard\` for card interactions and states
- \`Components/EmptyState\` for empty state visual
- \`Components/LoadingSpinner\` for loading indicator
    `
      }
    }

  },

  argTypes: {
    favorites: { table: { disable: true } },
    favoritesSize: { table: { disable: true } },
    isLoadingFavorites: { table: { disable: true } },
    userName: { table: { disable: true } },
    searchParams: { table: { disable: true } },
    isRevalidatingAfterDelete: { table: { disable: true } },
    loadingCard: { table: { disable: true } },
    ngOnInit: { table: { disable: true } },
    loadAllFavorites: { table: { disable: true } },
    onPageChanged: { table: { disable: true } },
    onMediaTypeChange: { table: { disable: true } },
    onSort: { table: { disable: true } },
    onFilter: { table: { disable: true } },
    openFavorite: { table: { disable: true } },
    deleteFavorite: { table: { disable: true } },
    updateFavorite: { table: { disable: true } },
    trackByFn: { table: { disable: true } }
  }
};

export default meta;
type Story = StoryObj<FavoritesComponent>;

export const FavoritesWithItems: Story = {
  parameters: {
    docs: {
      description: {
        story: `

Shows FavoritesComponent with user's populated media collection.

**State**:
- User authenticated (mock: "John Doe")
- 10 favorite items loaded (mixed types: movies, series, games)
- Pagination: page 1 of 1 (all items fit on single page)
- Sorting controls visible and ready for interaction

**Mock Data** (10 items):
1. Dune (2021) - Movie
2. Breaking Bad (2008–2013) - Series
3. Call of Duty: Black Ops (2010) - Game
4. Master and Commander: The Far Side of the World (2003) - Movie
5. True Detective (2014–) - Series
6. World of Warcraft: Wrath of the Lich King (2008) - Game
7. RoboCop (1987) - Movie
8. MobLand (2025–) - Series
9. Call of Duty: Modern Warfare 2 (2009) - Game
10. Seeking a Friend for the End of the World (2012) - Movie

**Visual Elements**:
- Page title: "JOHN DOE's favorites collection"
- Sorting controls component (search input, media type filter, sort dropdown)
- 10 favorite cards displayed in responsive grid layout
- Each card shows: poster, title, year, type, action buttons (edit, delete, view)
- Material paginator at bottom: "1-10 of 10"
- Empty state component hidden (favorites exist)

**Note**: This story demonstrates the **visual layout** with populated data. For detailed component interactions (filter/sort/delete/edit), see individual child component stories or the running application.

**Mock User**: John Doe (authenticated)

**Related Stories**:
- \`EmptyFavorites\` - Shows empty state when no favorites exist
- \`Components/FavoritesCard\` - Individual card interactions
- \`Components/SortingControls\` - Filter and sort UI
        `
      }
    }
  },

  decorators: [
    applicationConfig({
      providers: [
        { provide: FavoritesService, useClass: MockFavoritesServiceWithData }
      ]
    })
  ]

};

export const EmptyFavorites: Story = {
  parameters: {
    docs: {
      description: {
        story: `

Shows FavoritesComponent when user has no saved items.

**State**:
- User is logged in (mock: "John Doe")
- favorites = [] (empty array)
- favoritesSize = 0
- EmptyStateComponent displayed

**Visual Elements**:
- Page title: "JOHN DOE's favorites collection"
- Sorting controls (disabled or empty state)
- Empty state illustration with message
- No pagination (hidden when empty)

**User Actions**:
- Navigate to search page to add favorites
- (In production, EmptyState shows link/button to search)

**Mock User**: John Doe (authenticated)
        `
      }
    }
  }

  // Usa MockFavoritesServiceEmpty (por defecto en meta)
};

export const FavoritesWithPagination: Story = {
  parameters: {
    docs: {
      description: {
        story: `
### Favorites With Pagination

Shows FavoritesComponent with multiple pages of favorites.

**State**:
- User authenticated (mock: "John Doe")
- 19 favorite items total
- Currently viewing page 1 (items 1-10)
- Pagination controls active with next/prev buttons

**Visual Elements**:
- Material paginator: "1-10 of 19"
- Next/Last buttons enabled
- Previous/First buttons disabled (on page 1)
- Pagination controls show 3 pages total

**Note**: Pagination interaction is visual only. Click events not simulated in this story.
        `
      }
    }
  },

  decorators: [
    applicationConfig({
      providers: [
        { provide: FavoritesService, useClass: MockFavoritesServiceWithPagination }
      ]
    })
  ]
};