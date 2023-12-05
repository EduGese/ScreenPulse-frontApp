import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OmdbService } from './services/omdb/omdb.service';
import { StorageService } from './services/storage/storage.service';
import {MatToolbarModule} from '@angular/material/toolbar';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  providers: [
    OmdbService,
    StorageService
  ],
  exports: [
    MatToolbarModule
  ]  
})
export class SharedModule { }
