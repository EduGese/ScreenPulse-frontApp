import { OmdbService } from './../../shared/services/omdb/omdb.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  title: string ='';
  type: string = '';
  year: number = 1990;
  results: any = '';

  constructor(private OmdbService: OmdbService){}
  


  onSubmit(){
    this.OmdbService.getMovies(this.title, this.type, this.year).subscribe(
      (response)=>{
        console.log(response);
        this.results = response.Search;
      }
    )
  }

  

}
