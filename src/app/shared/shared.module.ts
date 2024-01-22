import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';

import { NavbarComponent } from './components/navbar/navbar.component';



import { OmdbService } from './services/omdb/omdb.service';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { SearchCoverComponent } from './components/search-cover/search-cover.component';
import { MovieResultsTableComponent } from './components/movie-results-table/movie-results-table.component';
import { FavoritesCardComponent } from './components/favorites-card/favorites-card.component';








const materialModules = [
  MatToolbarModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatButtonToggleModule,
  MatInputModule,
  MatSelectModule,
  MatGridListModule
  



  
]


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SearchCoverComponent,
    MovieResultsTableComponent,
    FavoritesCardComponent
  
  ],
  imports: [
    CommonModule,
    materialModules,
    RouterModule,
    MatTableModule,
    FormsModule
  ],
  providers: [
    OmdbService,
    FormsModule
  ],
  exports: [
    materialModules, 
    NavbarComponent,
    FooterComponent,
    SearchCoverComponent,
    MovieResultsTableComponent,
    FavoritesCardComponent

    
  ]  
})
export class SharedModule { }
