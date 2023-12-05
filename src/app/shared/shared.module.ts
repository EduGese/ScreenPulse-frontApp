import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OmdbService } from './services/omdb/omdb.service';
import { StorageService } from './services/storage/storage.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    OmdbService,
    StorageService
  ]
})
export class SharedModule { }
