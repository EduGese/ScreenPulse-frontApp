import { AfterViewInit, Component, EventEmitter, Input,  OnInit,  Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-movie-results-table',
  templateUrl: './movie-results-table.component.html',
  styleUrls: ['./movie-results-table.component.css'],
})
export class MovieResultsTableComponent implements AfterViewInit, OnInit {
  @Input() results!: any[];
  @Output() sendItem = new EventEmitter<any>();
  @Output() sendItem2 = new EventEmitter<any>();

  displayedColumns: string[] =  ['Title', 'Year', 'Type', 'Poster', 'Add' ];
  dataSource = new MatTableDataSource<any>();

  
  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.results || [];
  }
  @ViewChild(MatSort) sort!: MatSort;
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  addNewItem(item: any) {
    
    this.sendItem.emit(item);
  }
  openItem(item: any) {

    this.sendItem2.emit(item);
  }

}
