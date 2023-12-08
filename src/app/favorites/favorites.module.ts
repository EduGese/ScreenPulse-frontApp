import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { FavoritesRoutingModule } from './favorites-routing.module';

import { FavoritesComponent } from './pages/favorites.component';
import { FavoritesCardComponent } from './components/favorites-card/favorites-card.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FavoritesComponent,
    FavoritesCardComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class FavoritesModule { }
