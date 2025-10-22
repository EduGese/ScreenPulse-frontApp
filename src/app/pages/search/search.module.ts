import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { SearchRoutingModule } from './search-routing.module';

import { SearchComponent } from './page/search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SearchCoverComponent } from './components/search-cover/search-cover.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MediaItemResultsTableComponent } from './components/movie-results-table/movie-results-table.component';
import { MatButtonModule } from '@angular/material/button';

const MATERIAL_MODULES = [
  MatIconModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatButtonModule
];

@NgModule({
  declarations: [
    SearchComponent,
    SearchCoverComponent,
    MediaItemResultsTableComponent
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
