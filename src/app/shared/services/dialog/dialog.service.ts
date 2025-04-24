import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OmdbService } from 'src/app/shared/services/omdb/omdb.service';
import { MediaItemDialogComponent } from '../../components/movie-dialog/movie-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { MediaItem } from '../../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private OmdbService: OmdbService, private dialog: MatDialog, private toastrService: ToastrService) { }

  openMediaItem(windowWidth: number, mediaItem: MediaItem, fromFavoritesSection : boolean) {

      let dialogHeight = '90%';
      let dialogWidth = '80%';

    if(windowWidth >600 && windowWidth <800){
      dialogHeight = '85%';
      dialogWidth = '70%';
    }
    if(windowWidth >800){
      dialogHeight = '85%';
      dialogWidth = '85%';
    }
    this.OmdbService.getMediaItemInfo(mediaItem.imdbID).subscribe({
      next: (response) => {
        this.dialog.open(MediaItemDialogComponent, {
          data: {
            movie: mediaItem,
            response: response,
            fromFavoritesSection 
          },
          height: dialogHeight,
          width: dialogWidth,
          enterAnimationDuration: '500ms',
          exitAnimationDuration: '500ms',
          autoFocus: false,
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
        
      },
    });
  }
}
