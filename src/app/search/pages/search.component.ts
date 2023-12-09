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
  year: string = '2023';
  results: Movie[] = [];

  constructor(private OmdbService: OmdbService, private toastrService: ToastrService){}
  


  onSubmit(){
    this.type = this.type === 'all' ? '' : this.type;
    if(this.year && !/^[0-9]{4}$/.test(this.year)) {
      this.toastrService.error('Year must be a 4 digit number');
      return; 
    }

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
