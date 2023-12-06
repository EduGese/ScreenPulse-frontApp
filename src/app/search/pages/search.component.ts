import { OmdbService } from './../../shared/services/omdb/omdb.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  title: string ='';
  type: string = 'all';
  year: number = 1990;
  results: any = '';

  constructor(private OmdbService: OmdbService){}
  


  onSubmit(){
    this.type = this.type === 'all' ? '' : this.type;

    this.OmdbService.getMovies(this.title, this.type, this.year).subscribe(
      (response)=>{//Handdle responses with no movies
        response.Error ? console.log(response.Error) : this.results = response.Search;
        if(this.type == ''){
          this.type = 'all';
        }
        this.type = this.type == '' ? 'all' : this.type;
      }
    )
    
  }

  

}
