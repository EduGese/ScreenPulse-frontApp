import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MediaItem } from '../../models/movie.model';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { MediaItemDialogData } from '../../models/movieDialogData.model';

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.scss']
})
export class MediaItemDialogComponent {
constructor(
  @Inject(MAT_DIALOG_DATA) public data:MediaItemDialogData,
  private toastrService: ToastrService, 
  private favoritesService: FavoritesService,
  private authService: AuthService,
  private router: Router,
  private dialogRef: MatDialogRef<MediaItemDialogComponent>
  ){ }

addToFavorites(movie:MediaItem){
  if(!this.authService.isLoggedIn()){
    this.toastrService.error('You must be logged in to add movies to your list', 'Error');
    this.dialogRef.close();
    this.router.navigate(['/login']);
    return;
  }
  this.favoritesService.addToFavorites(movie).subscribe({
    next:() => {
      this.toastrService.success(movie.title, 'Added to favorites');
    },
    error:(error) => {
      this.toastrService.warning(error.message);
    }
   });
}
}
