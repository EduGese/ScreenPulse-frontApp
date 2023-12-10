import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { SharedModule } from '../shared/shared.module';

import { SearchRoutingModule } from './search-routing.module';

import { SearchComponent } from './pages/search.component';
import { MovieResultsTableComponent } from './components/movie-results-table/movie-results-table.component';



@NgModule({
  declarations: [
    SearchComponent,
    MovieResultsTableComponent
   
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class SearchModule { }
