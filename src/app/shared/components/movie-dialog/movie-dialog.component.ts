import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Movie } from '../../models/movie.model';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.css']
})
export class MovieDialogComponent {
constructor(
  @Inject(MAT_DIALOG_DATA) public data:any,
  private toastrService: ToastrService, 
  private favoritesService: FavoritesService,
  private authService: AuthService,
  private router: Router,
  private dialogRef: MatDialogRef<MovieDialogComponent>
  ){}

addToFavorites(movie:Movie){
  if(!this.authService.isLoggedIn()){
    this.toastrService.error('You must be logged in to add movies to your list', 'Error');
    this.router.navigate(['/login']);
    this.dialogRef.close();
    return;
  }
  this.favoritesService.addToFavorites(movie).subscribe({
    next:() => {
      this.toastrService.success(movie.Title, 'Added to favorites');
    },
    error:(error) => {
      console.log(error);
      this.toastrService.error(error.error.message);
    }
   });
}
}
