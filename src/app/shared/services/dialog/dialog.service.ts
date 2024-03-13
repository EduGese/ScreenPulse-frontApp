import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OmdbService } from 'src/app/shared/services/omdb/omdb.service';
import { MovieDialogComponent } from '../../components/movie-dialog/movie-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private OmdbService: OmdbService, private dialog: MatDialog, private toastrService: ToastrService) { }

  openMovie(windowWidth: number, movie: any){
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
    this.OmdbService.getMovieInfo(movie.imdbID).subscribe({
      next: (response) => {
        const movieAndResponse = {
          movie: movie,
          response: response,
        };
        const dialogRef = this.dialog.open(MovieDialogComponent, {
          data: movieAndResponse,
          height: dialogHeight,
          width: dialogWidth,
          enterAnimationDuration: '500ms',
          exitAnimationDuration: '500ms',
          autoFocus: false,
        });
        dialogRef.afterOpened().subscribe(() => {
          const imgElement = document.querySelector(
            '.poster img'
          ) as HTMLElement;
          if (imgElement) {
            imgElement.focus();
          }
        });
      },
      error: (error) => {
        this.toastrService.error(error.error.message);
      },
    });
  }
}
