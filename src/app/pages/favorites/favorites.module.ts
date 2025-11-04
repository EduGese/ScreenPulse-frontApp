import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FavoritesRoutingModule } from './favorites-routing.module';

import { FavoritesComponent } from './page/favorites.component';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SharedModule } from 'src/app/shared/shared.module';
import { SortingControlsComponent } from './components/sorting-controls/sorting-controls.component';



@NgModule({
  declarations: [
    FavoritesComponent,
    SortingControlsComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    MatProgressBarModule,
    SharedModule,
    FormsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatSortModule,
    MatButtonToggleModule
  ]
})
export class FavoritesModule { }
