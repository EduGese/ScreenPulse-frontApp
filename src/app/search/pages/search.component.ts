import { ToastrService } from 'ngx-toastr';
import { OmdbService } from './../../shared/services/omdb/omdb.service';
import { Component } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  title: string ='';
  type: string = 'all';
  year: number = 1990;
  results: Movie[] = [];

  constructor(private OmdbService: OmdbService, private toastrService: ToastrService){}
  


  onSubmit(){
    this.type = this.type === 'all' ? '' : this.type;

    this.OmdbService.getMovies(this.title, this.type, this.year).subscribe(
      (response)=>{
        //Handdle responses with no movies
        response.Error ? this.toastrService.error(response.Error, 'Search error') : this.results = response.Search || [];// asign [] in case response is undefined
        this.type = this.type == '' ? 'all' : this.type;
      },
      (error)=>{
        //Handdle bad responses
        this.toastrService.error(error.message, 'Major error');
      }
    )
  }
}
