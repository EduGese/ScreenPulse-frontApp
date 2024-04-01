import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { FavoritesRoutingModule } from './favorites-routing.module';

import { FavoritesComponent } from './page/favorites.component';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    MatProgressBarModule,
    SharedModule,
    FormsModule,
  ]
})
export class FavoritesModule { }
