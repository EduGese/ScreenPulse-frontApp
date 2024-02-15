import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';








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
    FavoritesCardComponent,
    SearchBarComponent,
    LoginFormComponent,
    RegisterFormComponent

  
  ],
  imports: [
    CommonModule,
    materialModules,
    RouterModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule
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
    FavoritesCardComponent,
    SearchBarComponent,
    LoginFormComponent,
    RegisterFormComponent

    
  ]  
})
export class SharedModule { }
