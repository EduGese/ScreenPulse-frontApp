import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OmdbService } from './services/omdb/omdb.service';
import { StorageService } from './services/storage/storage.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';



const materialModules = [
  MatToolbarModule
]


@NgModule({
  declarations: [
    NavbarComponent
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
