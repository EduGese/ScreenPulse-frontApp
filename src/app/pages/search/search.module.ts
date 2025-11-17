import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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
import { CarouselComponent } from './components/carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

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
    MediaItemResultsTableComponent,
    CarouselComponent,
    SearchBarComponent,
    
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    ...MATERIAL_MODULES,
    NgbModule
  ]
})
export class SearchModule { }
