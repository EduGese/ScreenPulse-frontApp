import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-movie-results-table',
  templateUrl: './movie-results-table.component.html',
  styleUrls: ['./movie-results-table.component.css'],
})
export class MovieResultsTableComponent  {
  @Input() results!: any[];
  @Output() addItem = new EventEmitter<any>();

  displayedColumns: string[] =  ['Title', 'Year', 'Type', 'Poster', 'Add' ];
  
  constructor() {}


  addNewItem(item: any) {
    
    this.addItem.emit(item);
  }

}
