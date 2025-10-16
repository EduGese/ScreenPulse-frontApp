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
import { MediaItemResultsTableComponent } from './components/movie-results-table/movie-results-table.component';
import { FavoritesCardComponent } from './components/favorites-card/favorites-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { MediaItemDialogComponent } from './components/movie-dialog/movie-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './components/carousel/carousel.component';
import {MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SortingControlsComponent } from './components/sorting-controls/sorting-controls.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { TrailerDialogComponent } from './components/trailer-dialog/trailer-dialog.component';



const materialModules = [
  MatToolbarModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatButtonToggleModule,
  MatInputModule,
  MatSelectModule,
  MatGridListModule,
  MatListModule,
  MatDividerModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatChipsModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatDialogModule,
  MatSortModule, 
]


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SearchCoverComponent,
    MediaItemResultsTableComponent,
    FavoritesCardComponent,
    SearchBarComponent,
    LoginFormComponent,
    RegisterFormComponent,
    MediaItemDialogComponent,
    CarouselComponent,
    SortingControlsComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    TrailerDialogComponent

  
  ],
  imports: [
    CommonModule,
    materialModules,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
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
    MediaItemResultsTableComponent,
    FavoritesCardComponent,
    SearchBarComponent,
    LoginFormComponent,
    RegisterFormComponent,
    MediaItemDialogComponent,
    CarouselComponent,
    NgbModule,
    SortingControlsComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    TrailerDialogComponent
  ]  
})
export class SharedModule { }
