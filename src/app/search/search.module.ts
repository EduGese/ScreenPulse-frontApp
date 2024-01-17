import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { SharedModule } from '../shared/shared.module';

import { SearchRoutingModule } from './search-routing.module';

import { SearchComponent } from './pages/search.component';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    SearchComponent
   
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    FormsModule,
    
   
  ]
})
export class SearchModule { }
