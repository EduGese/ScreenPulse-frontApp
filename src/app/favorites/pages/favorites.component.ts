import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit{
  favorites: Movie[] | [] = [];

  constructor(private storageService: StorageService){}
  ngOnInit(): void {
    this.favorites = this.storageService.getFavorites();
    console.log(this.favorites);
  }

}
