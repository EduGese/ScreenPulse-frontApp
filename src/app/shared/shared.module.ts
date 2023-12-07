import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';

import { NavbarComponent } from './components/navbar/navbar.component';



import { OmdbService } from './services/omdb/omdb.service';
import { StorageService } from './services/storage/storage.service';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';




const materialModules = [
  MatToolbarModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule


  
]


@NgModule({
  declarations: [
    NavbarComponent,
  
  ],
  imports: [
    CommonModule,
    materialModules
  ],
  providers: [
    OmdbService,
    StorageService
  ],
  exports: [
    materialModules, NavbarComponent 
    
  ]  
})
export class SharedModule { }
