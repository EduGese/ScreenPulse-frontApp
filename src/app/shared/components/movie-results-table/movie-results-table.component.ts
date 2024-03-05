import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-movie-results-table',
  templateUrl: './movie-results-table.component.html',
  styleUrls: ['./movie-results-table.component.css'],
})
export class MovieResultsTableComponent  {
  @Input() results!: any[];
  @Output() sendItem = new EventEmitter<any>();
  @Output() sendItem2 = new EventEmitter<any>();

  displayedColumns: string[] =  ['Title', 'Year', 'Type', 'Poster', 'Add' ];
  
  
  constructor() {}


  addNewItem(item: any) {
    
    this.sendItem.emit(item);
  }
  openItem(item: any) {

    this.sendItem2.emit(item);
  }

}
