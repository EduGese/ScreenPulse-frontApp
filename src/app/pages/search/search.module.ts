import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { SearchRoutingModule } from './search-routing.module';

import { SearchComponent } from './page/search.component';
import { SharedModule } from 'src/app/shared/shared.module';



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
