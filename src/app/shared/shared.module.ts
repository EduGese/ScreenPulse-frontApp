import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { OmdbService } from './services/omdb/omdb.service';

import { FavoritesCardComponent } from './components/favorites-card/favorites-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MediaItemDialogComponent } from './components/movie-dialog/movie-dialog.component';
import { SortingControlsComponent } from './components/sorting-controls/sorting-controls.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { TrailerDialogComponent } from './components/trailer-dialog/trailer-dialog.component';

import { FallbackImagesDirective } from './directives/fallback-images.directive';
import { AuthFormComponent } from './components/auth-form/auth-form.component';

const MATERIAL_MODULES = [
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
  MatPaginatorModule 
];

@NgModule({
  declarations: [
    FavoritesCardComponent,
    SearchBarComponent,
    MediaItemDialogComponent,
    SortingControlsComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    TrailerDialogComponent,
    FallbackImagesDirective,
    AuthFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ...MATERIAL_MODULES 
  ],
  providers: [
    OmdbService  
  ],
  exports: [
    ...MATERIAL_MODULES,
    NgbModule,
    FavoritesCardComponent,
    SearchBarComponent,
    MediaItemDialogComponent,
    SortingControlsComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    TrailerDialogComponent,
    FallbackImagesDirective,
    AuthFormComponent
  ]
})
export class SharedModule { }
