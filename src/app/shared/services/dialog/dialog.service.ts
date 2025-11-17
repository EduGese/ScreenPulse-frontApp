import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OmdbService } from 'src/app/shared/services/omdb/omdb.service';
import { ToastrService } from 'ngx-toastr';
import { MediaItem } from '../../models/movie.model';
import { from, map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private OmdbService: OmdbService, private dialog: MatDialog, private toastrService: ToastrService) { }

  openMediaItem(
    windowWidth: number,
    mediaItem: MediaItem,
    fromFavoritesSection: boolean
  ): Observable<void> {
    let dialogHeight = '90%';
    let dialogWidth = '80%';

    if (windowWidth > 600 && windowWidth < 800) {
      dialogHeight = '85%';
      dialogWidth = '70%';
    }
    if (windowWidth > 800) {
      dialogHeight = '85%';
      dialogWidth = '85%';
    }

    return this.OmdbService.getMediaItemInfo(mediaItem.imdbID).pipe(
      switchMap((response) => {
        return from(
          import('../../components/movie-dialog/movie-dialog.component')
        ).pipe(
          tap({
            next: (module) => {
              this.dialog.open(module.MediaItemDialogComponent, {
                data: {
                  movie: mediaItem,
                  response: response,
                  fromFavoritesSection
                },
                height: dialogHeight,
                width: dialogWidth,
                panelClass: 'movie-details-dialog',
                enterAnimationDuration: '500ms',
                exitAnimationDuration: '500ms',
                autoFocus: false,
              });
            },
            error: (importError) => {
              console.error('Failed to load MediaItemDialogComponent:', importError);
              this.toastrService.error('Could not load movie details dialog');
            }
          }),
          map(() => undefined)
        );
      }),
      tap({
        error: (apiError) => {
          this.toastrService.error(apiError.message);
        }
      })
    );
  }


  openTrailerDialog(videoUrl: string) {
    import('../../components/trailer-dialog/trailer-dialog.component')
      .then((module) => {
        this.dialog.open(module.TrailerDialogComponent, {
          data: {
            videoUrl: videoUrl,
          },
          width: '80vw',
          height: '70vh',
          maxWidth: '1200px',
          maxHeight: '800px',
          panelClass: 'trailer-dialog',
          autoFocus: false,
          disableClose: false,
          enterAnimationDuration: '300ms',
          exitAnimationDuration: '200ms',
        });
      })
      .catch((error) => {
        console.error('Failed to load TrailerDialogComponent:', error);
        this.toastrService.error('Could not load trailer dialog');
      });
  }

}
