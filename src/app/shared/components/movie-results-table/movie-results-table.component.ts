import { AfterViewInit, Component, EventEmitter, Input,  OnChanges,  OnInit,  Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-movie-results-table',
  templateUrl: './movie-results-table.component.html',
  styleUrls: ['./movie-results-table.component.css'],
})
export class MovieResultsTableComponent implements AfterViewInit, OnChanges {
  @Input() results!: any[];
  @Output() sendItem = new EventEmitter<any>();
  @Output() sendItem2 = new EventEmitter<any>();

  displayedColumns: string[] =  ['Title', 'Year', 'Type', 'Poster', 'Add' ];
  dataSource = new MatTableDataSource<any>();

  
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['results'] && changes['results'].currentValue) {
      this.dataSource.data = changes['results'].currentValue || [];
    }
  }


  // ngOnInit(): void {
  //   this.dataSource.data = this.results || [];
  //   console.log('Resultados en la tabla-->',this.results);
  // }
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
