import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule) 
  },
  
  { 
    path: 'favorites',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./pages/favorites/favorites.module').then(m => m.FavoritesModule) 
  },
  
  { 
    path: 'auth', 
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) 
  },
  
  { 
    path: '**', 
    redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
