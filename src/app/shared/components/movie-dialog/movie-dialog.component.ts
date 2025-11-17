import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MediaItem } from '../../models/movie.model';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { MediaItemDialogData } from '../../models/movieDialogData.model';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DialogService } from '../../services/dialog/dialog.service';
import { EMPTY, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.scss']
})
export class MediaItemDialogComponent {
  showPlayer = false;
  videoUrl!: SafeResourceUrl;
  imdbLogoPath  = '/assets/images/imdb.png';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MediaItemDialogData,
    private toastrService: ToastrService,
    private favoritesService: FavoritesService,
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<MediaItemDialogComponent>,
    private dialogService: DialogService
  ) { }

addToFavorites(mediaItem: MediaItem) {
  this.authService.isLoggedInObservable().pipe(
    take(1),
    switchMap(loggedIn => {
      if (!loggedIn) {
        this.toastrService.error('You must be logged in to add movies to your list', 'Error');
        this.dialogRef.close();
        this.router.navigate(['/auth/login']);
        return EMPTY; 
      }
      return this.favoritesService.addToFavorites(mediaItem);
    })
  ).subscribe({
    next: () => this.toastrService.success(mediaItem.title, 'Added to favorites'),
    error: (error) => this.toastrService.warning(error.message)
  });
}

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/no_poster.jpg';
  }

  playTrailer(): void {
    if (!this.data.response.youtubeURLTrailer) return;

    this.dialogService.openTrailerDialog(
      this.data.response.youtubeURLTrailer,
    );
  }
}
