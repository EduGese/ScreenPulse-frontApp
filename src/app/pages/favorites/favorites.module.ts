import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { FavoritesRoutingModule } from './favorites-routing.module';

import { FavoritesComponent } from './page/favorites.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class FavoritesModule { }
