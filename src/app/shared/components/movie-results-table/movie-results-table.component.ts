import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableColumn } from 'src/app/shared/models/tableColumn.model';

@Component({
  selector: 'app-movie-results-table',
  templateUrl: './movie-results-table.component.html',
  styleUrls: ['./movie-results-table.component.css'],
})
export class MovieResultsTableComponent implements OnInit {
  @Input() results!: any[];
  @Input() columns: TableColumn[] = [];
  @Output() addItem = new EventEmitter<any>();

  displayedColumns: string[] = [];
  
  constructor() {}

  ngOnInit(): void {
    this.columns.forEach((element) => {
      this.displayedColumns.push(element.header);
    });
  }

  isAnImage(property: string): boolean {
    if (property.endsWith('.jpg') || property === 'N/A') {
      return true;
    } else 
    return false;
  }
  addNewItem(item: any) {
    
    this.addItem.emit(item);
  }

}
