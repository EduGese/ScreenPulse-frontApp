import { ToastrService } from 'ngx-toastr';
import { OmdbService } from './../../shared/services/omdb/omdb.service';
import { Component } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';
import { TableColumn } from 'src/app/shared/models/tableColumn.model';
import { FavoritesService } from 'src/app/shared/services/favorites/favorites.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  title: string ='';
  type: string = 'movie';
  year: string = '';
  results: Movie[] = [];

  types:any[] = [
    {value: 'movie', viewValue: 'Movie'},
    {value: 'series', viewValue: 'Serie'},
    {value: 'game', viewValue: 'Game'},
    {value: 'all', viewValue: 'All'}
  ];

  columns: TableColumn[] = [
    { property: 'Title', header: 'Title' },
    { property: 'Year', header: 'Year'},
    { property: 'Type', header: 'Type'},
    { property: 'Poster', header: 'Poster'},
    { property: 'Add', header: 'Add'}
 ];

  constructor(
    private OmdbService: OmdbService, 
    private toastrService: ToastrService, 
    private favoritesService: FavoritesService
    ){}
  


  onSubmit(info: any){
    let {title, type, year} = info;
    type = type=== 'all' ? '' : type;

    if(title == '') {
      this.toastrService.error('Field Title required');
      return; 
    }

    if(year && !/^[0-9]{4}$/.test(year)) {
      this.toastrService.error('Year must be a 4 digit number');
      return; 
    }

    this.OmdbService.getMovies(title, type, year).subscribe(
      (response)=>{
        //Handdle responses with no movies
        response.Error ? this.toastrService.error(response.Error, 'Search error') : this.results = response.Search || [];// asign [] in case response is undefined
        type = type == '' ? 'all' : type;
      },
      (error)=>{
        //Handdle bad responses
        this.toastrService.error(error.message, 'Major error');
      }
    )
  }
 

  addToFavories(item: any) {
    this.favoritesService.addToFavorites(item).subscribe(
      () => {
        this.toastrService.success(item.Title, 'Added to favorites');
      },
      (error) => {
        console.error('Error:', error);
        if (error.message === 'Element duplicated') {
          this.toastrService.error(item.Title, 'It is already in your list');
        }
      }
    );
  }
}
