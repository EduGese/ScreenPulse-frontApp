import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { SearchRoutingModule } from './search-routing.module';

import { SearchComponent } from './page/search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SearchCoverComponent } from './components/search-cover/search-cover.component';

const MATERIAL_MODULES = [
  MatIconModule,
];

@NgModule({
  declarations: [
    SearchComponent,
    SearchCoverComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    FormsModule,
    MatDialogModule,
    ...MATERIAL_MODULES
  ]
})
export class SearchModule { }
