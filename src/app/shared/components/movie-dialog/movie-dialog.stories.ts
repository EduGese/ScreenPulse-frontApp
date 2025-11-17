import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { MediaItemDialogComponent } from './movie-dialog.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { DialogService } from '../../services/dialog/dialog.service';
import { of } from 'rxjs';
import { MediaItem } from '../../models/movie.model';
import { OmdbDetails } from '../../models/ombdDetails';
import { MediaItemDialogData } from '../../models/movieDialogData.model';


// ════════════════════════════════════════════════════════════
// MOCK DATA
// ════════════════════════════════════════════════════════════

const mockMediaItem: MediaItem = {
  _id: '1',
  title: 'Inception',
  year: '2010',
  imdbID: 'tt1375666',
  type: 'movie',
  poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  description: 'A skilled thief who steals corporate secrets through the use of dream-sharing technology...',
  user: 'user123',
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-15T10:30:00Z'
};

const mockOmdbResponse: OmdbDetails = {
  Title: 'Inception',
  Year: '2010',
  Rated: 'PG-13',
  Released: '16 Jul 2010',
  Runtime: '148 min',
  Genre: 'Action, Sci-Fi, Thriller',
  Director: 'Christopher Nolan',
  Writer: 'Christopher Nolan, Jonathan Nolan',
  Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Marion Cotillard',
  Plot: 'A skilled thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
  Language: 'English, Japanese, French',
  Country: 'United States, United Kingdom',
  Awards: 'Won 4 Oscars. 159 wins & 218 nominations total',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  Ratings: [
    { Source: 'Internet Movie Database', Value: '8.8/10' },
    { Source: 'Rotten Tomatoes', Value: '87%' },
    { Source: 'Metacritic', Value: '74/100' }
  ],
  Metascore: '74',
  imdbRating: '8.8',
  imdbVotes: '2,645,513',
  imdbID: 'tt1375666',
  Type: 'movie',
  Response: 'True',
  youtubeURLTrailer: 'https://www.youtube.com/embed/YoHD_XwrzKw'
};

const mockOmdbResponseNoTrailer: OmdbDetails = {
  ...mockOmdbResponse,
  youtubeURLTrailer: ''
};

const mockOmdbResponseNoPoster: OmdbDetails = {
  ...mockOmdbResponse,
  Poster: 'N/A'
};

const meta: Meta<MediaItemDialogComponent> = {
  title: 'Shared/MediaItemDialog',
  component: MediaItemDialogComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule
      ],
      declarations: [MediaItemDialogComponent],
      providers: [
        {
          provide: ToastrService,
          useValue: {
            success: (title: string, message: string) => console.log('✅ Toast Success:', message, title),
            error: (message: string, title: string) => console.log('❌ Toast Error:', title, message),
            warning: (message: string) => console.log('⚠️ Toast Warning:', message)
          }
        },
        {
          provide: FavoritesService,
          useValue: {
            addToFavorites: () => {
              return of({ success: true });
            }
          }
        },
        {
          provide: AuthService,
          useValue: {
            isLoggedInObservable: () => of(true)
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: () => Promise.resolve(true)
          }
        },
        {
          provide: DialogService,
          useValue: {
            openTrailerDialog: () => {
              return of({ success: true });
            }
          }
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: () => { /* empty */ }
          }
        }
      ]
    })
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light background',
      values: [
        { name: 'light background', value: '#FFFFFF' }
      ]
    },
    docs: {
      description: {
        component: `
Material Dialog component displaying comprehensive media item (movie/series/game) details from OMDB API.

## Purpose

Presents detailed information about a media item in a modal dialog, allowing users to:
- View poster, title, and comprehensive details
- Add items to favorites (if not already in favorites section)
- Watch trailer videos (if available)
- Close dialog

## Data Flow

**Opening the Dialog**:
1. User clicks on media item in search results
2. Component calls \`DialogService.openMediaItem()\`
3. DialogService calls \`OmdbService.getMediaItemInfo()\`
4. On success, opens \`MediaItemDialogComponent\` with OMDB data
5. Dialog displays via \`MAT_DIALOG_DATA\` injection

**Data Structure** (\`MediaItemDialogData\`):
\`\`\`typescript
{
  movie: MediaItem,              // Source media item
  response: OmdbDetails,         // OMDB API response
  fromFavoritesSection: boolean  // Context flag
}
\`\`\`

## Display Information

| Field | Source | Example |
|-------|--------|---------|
| Title & Year | response.Title, response.Year | "Inception (2010)" |
| Poster Image | response.Poster | Image or no_poster.jpg fallback |
| Director | response.Director | "Christopher Nolan" |
| Actors | response.Actors | Comma-separated list |
| Plot | response.Plot | Full movie synopsis |
| Genre | response.Genre | "Action, Sci-Fi, Thriller" |
| Language | response.Language | "English, Japanese, French" |
| Country | response.Country | "United States, United Kingdom" |
| Runtime | response.Runtime | "148 min" |
| Rating | response.imdbRating + imdbVotes | "8.8/10 (2,645,513 votes)" |

## Button Behavior

| Button | Visibility | Action |
|--------|-----------|--------|
| **Close** | Always visible | Closes dialog |
| **Add** | Only if \`!fromFavoritesSection\` | Adds to favorites (requires auth) |
| **Trailer** | Only if \`youtubeURLTrailer\` exists | Opens TrailerDialogComponent |

## Dialog Configuration

- **Size**: Responsive (70-85% width, 85-90% height based on screen)
- **Animation**: 500ms enter/exit
- **Backdrop**: Click to close (Material default)
- **Styling Class**: 'movie-details-dialog'
- **Auto Focus**: Disabled (prevents auto-focus on elements)

## Error Handling

| Scenario | Behavior |
|----------|----------|
| No poster image | Shows \`assets/images/no_poster.jpg\` fallback |
| Image load fails | Shows \`assets/images/no_poster.jpg\` fallback |
| Add to favorites (not logged in) | Shows error toast → closes dialog → redirects to /auth/login |
| Add to favorites (error) | Shows warning toast |

## Responsive Dialog Sizing

Dialog size determined by \`DialogService.openMediaItem()\` based on window width:

| Window Width | Dialog Width | Dialog Height |
|--------------|--------------|---------------|
| < 600px | 80% | 90% |
| 600-800px | 70% | 85% |
| > 800px | 85% | 85% |
        `
      }
    }
  },
  argTypes: {
    data: {
      table: { disable: true }
    },
    videoUrl: {
      table: { disable: true }
    },
    playTrailer: {
      table: { disable: true }
    },
    showPlayer: {
      table: { disable: true }
    },
    onImageError: {
      table: { disable: true }
    },
    addToFavorites: {
      action: 'addToFavorites',
      description: 'Triggered when user clicks "Add to Favorites" button. Adds the media item to the user\'s favorites list.',
      table: {
        category: 'Actions',
        type: { summary: '(mediaItem: MediaItem) => void' }
      }
    },
  }
};

export default meta;
type Story = StoryObj<MediaItemDialogComponent>;

// ════════════════════════════════════════════════════════════
// 🎬 MOVIE DETAILS: Standard Movie View
// ════════════════════════════════════════════════════════════
export const MovieDetails: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            movie: mockMediaItem,
            response: mockOmdbResponse,
            fromFavoritesSection: false
          } as MediaItemDialogData
        }
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        story: `
Standard movie details dialog showing complete information with all buttons available.

**Media**: Inception (2010) - Movie
- **Poster**: Available
- **Trailer**: Available (YouTube)
- **Context**: From search results (not favorites)

**Visible Buttons**:
- ✅ **Close** - Closes dialog
- ✅ **Add to Favorites** - Adds movie to favorites
- ✅ **Watch Trailer** - Opens trailer in separate dialog

**Information Displayed**:
- Director: Christopher Nolan
- Actors: Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Marion Cotillard
- Genre: Action, Sci-Fi, Thriller
- Runtime: 148 min
- Rating: 8.8/10 (2,645,513 votes)
- Plot, Language, Country, Awards, etc.

**Use Case**: User found movie in search and wants to view details before adding to favorites.
        `
      }
    }
  }
};


// ════════════════════════════════════════════════════════════
// ❤️ FROM FAVORITES: Limited Actions
// ════════════════════════════════════════════════════════════
export const FromFavorites: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            movie: mockMediaItem,
            response: mockOmdbResponse,
            fromFavoritesSection: true
          } as MediaItemDialogData
        }
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        story: `
Movie details dialog opened from favorites section.

**Key Differences**:
- ❌ **"Add to Favorites" button is HIDDEN** (already in favorites)
- ✅ Close button available
- ✅ Watch Trailer button available (if trailer exists)

**Visible Buttons**:
- ✅ Close
- ✅ Watch Trailer

**Flag**: \`fromFavoritesSection: true\`

**Use Case**: User is browsing their favorites list and wants to view details or watch trailer again.
        `
      }
    }
  }
};

// ════════════════════════════════════════════════════════════
// 🎞️ NO TRAILER: Missing YouTube URL
// ════════════════════════════════════════════════════════════
export const NoTrailer: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            movie: mockMediaItem,
            response: mockOmdbResponseNoTrailer,
            fromFavoritesSection: false
          } as MediaItemDialogData
        }
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        story: `
Movie details when YouTube trailer is not available.

**Key Differences**:
- ❌ **"Watch Trailer" button is HIDDEN** (\`youtubeURLTrailer\` is empty/null)
- ✅ Close button available
- ✅ Add to Favorites button available

**Condition**: \`response.youtubeURLTrailer === '' or null\`

**Use Case**: Older movies, indie films, or items without trailer on OMDB may not have \`youtubeURLTrailer\` populated.
        `
      }
    }
  }
};

// ════════════════════════════════════════════════════════════
// 🖼️ NO POSTER: Image Fallback
// ════════════════════════════════════════════════════════════
export const NoPoster: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            movie: mockMediaItem,
            response: mockOmdbResponseNoPoster,
            fromFavoritesSection: false
          } as MediaItemDialogData
        }
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        story: `
Movie details when poster image is not available.

**Image Handling**:
- OMDB returns \`Poster: 'N/A'\` when no image available
- Template detects this and shows fallback: \`assets/images/no_poster.jpg\`
- All other information displayed normally

**Fallback Triggers**:
1. \`response.Poster === 'N/A'\` (OMDB returned no image)
2. Image URL fails to load (404 error) - handled by \`onImageError()\` handler

Both scenarios show the same placeholder image.

**Use Case**: Some older movies, rare items, or games may not have poster images in OMDB database.
        `
      }
    }
  }
};

// // ════════════════════════════════════════════════════════════
// // 🔐 NOT LOGGED IN: Add to Favorites Authentication
// // ════════════════════════════════════════════════════════════
// export const NotLoggedIn: Story = {
//   decorators: [
//     moduleMetadata({
//       providers: [
//         {
//           provide: MAT_DIALOG_DATA,
//           useValue: {
//             movie: mockMediaItem,
//             response: mockOmdbResponse,
//             fromFavoritesSection: false
//           } as MediaItemDialogData
//         },
//         {
//           provide: AuthService,
//           useValue: {
//             isLoggedInObservable: () => of(false)
//           }
//         }
//       ]
//     })
//   ],
//   play: async ({ canvasElement }) => {
//     // Simulate clicking Add button to show the flow
//     await new Promise(resolve => setTimeout(resolve, 500));
//     const addButton = canvasElement.querySelector('button[color="accent"]') as HTMLButtonElement;
//     if (addButton) {
//       addButton.click();
//     }
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: `
// Movie details when user is **NOT authenticated**.

// **⚠️ To see authentication flow in action, switch to "Canvas" tab.**

// **Add to Favorites Behavior** (when clicking "Add" button):
// 1. ❌ Checks \`AuthService.isLoggedInObservable()\` → returns \`false\`
// 2. 📢 Shows error toast: "You must be logged in to add movies to your list"
// 3. 🔄 Closes dialog automatically
// 4. 🔐 Redirects to \`/auth/login\` page

// **Visible Buttons**:
// - ✅ Close button
// - ✅ Add button (triggers authentication flow)
// - ✅ Trailer button

// **Use Case**: Unauthenticated users can browse movie details but need to login to save to favorites.

// **Flow** (in Canvas):
// 1. View movie details
// 2. Click "Add to Favorites" button
// 3. Error toast appears: "You must be logged in..."
// 4. Dialog closes automatically
// 5. Router navigates to login page
//         `
//       }
//     }
//   }
// };

// // ════════════════════════════════════════════════════════════
// // 📱 MOBILE VIEW: Responsive Dialog (Small Screen)
// // ════════════════════════════════════════════════════════════
// export const MobileView: Story = {
//   decorators: [
//     moduleMetadata({
//       providers: [
//         {
//           provide: MAT_DIALOG_DATA,
//           useValue: {
//             movie: mockMediaItem,
//             response: mockOmdbResponse,
//             fromFavoritesSection: false
//           } as MediaItemDialogData
//         }
//       ]
//     })
//   ],
//   parameters: {
//     viewport: {
//       defaultViewport: 'iphone12'
//     },
//     docs: {
//       description: {
//         story: `
// Movie details dialog optimized for mobile devices (375px viewport).

// **Mobile Dialog Configuration** (< 600px):
// - **Width**: 80% of screen
// - **Height**: 90% of viewport
// - **Scroll**: Content scrollable if exceeds height
// - **Buttons**: Touch-friendly sizes
// - **Layout**: Stacked vertically for small screens

// **Adaptations**:
// - Poster image scales responsively
// - Text remains readable at smaller sizes
// - Button area optimized for touch
// - Content padding adjusted for mobile

// **Use Case**: Viewing movie details on smartphones.

// **Responsive Breakpoints** (handled by DialogService):
// - **< 600px**: 80% width, 90% height (mobile)
// - **600-800px**: 70% width, 85% height (tablet)
// - **> 800px**: 85% width, 85% height (desktop)
//         `
//       }
//     }
//   }
// };

// // ════════════════════════════════════════════════════════════
// // 🖥️ TABLET VIEW: Responsive Dialog (Medium Screen)
// // ════════════════════════════════════════════════════════════
// export const TabletView: Story = {
//   decorators: [
//     moduleMetadata({
//       providers: [
//         {
//           provide: MAT_DIALOG_DATA,
//           useValue: {
//             movie: mockMediaItem,
//             response: mockOmdbResponse,
//             fromFavoritesSection: false
//           } as MediaItemDialogData
//         }
//       ]
//     })
//   ],
//   parameters: {
//     viewport: {
//       defaultViewport: 'ipad'
//     },
//     docs: {
//       description: {
//         story: `
// Movie details dialog optimized for tablet devices (768px viewport).

// **Tablet Dialog Configuration** (600-800px):
// - **Width**: 70% of screen
// - **Height**: 85% of viewport
// - **Layout**: More space for content than mobile
// - **Readability**: Larger text and comfortable spacing
// - **Buttons**: Still touch-optimized

// **Use Case**: Viewing movie details on tablets (iPad, Android tablets, etc.).

// **Responsive Breakpoints**:
// - **< 600px**: 80% width, 90% height (mobile)
// - **600-800px**: 70% width, 85% height (tablet) ← This story
// - **> 800px**: 85% width, 85% height (desktop)
//         `
//       }
//     }
//   }
// };
