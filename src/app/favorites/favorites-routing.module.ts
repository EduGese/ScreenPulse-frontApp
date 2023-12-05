import { NgModule } from '@angular/core';

import { FavoritesComponent } from './pages/favorites.component';

import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [{ path: '', component: FavoritesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesRoutingModule { }
