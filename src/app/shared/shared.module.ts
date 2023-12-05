import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OmdbService } from './services/omdb/omdb.service';
import { StorageService } from './services/storage/storage.service';
import {MatToolbarModule} from '@angular/material/toolbar';


const materialModules = [
  MatToolbarModule
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialModules
  ],
  providers: [
    OmdbService,
    StorageService
  ],
  exports: [
    materialModules
  ]  
})
export class SharedModule { }
