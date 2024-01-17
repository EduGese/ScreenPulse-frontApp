import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/shared/models/movie.model';
import { TableColumn } from 'src/app/shared/models/tableColumn.model';
import { FavoritesService } from 'src/app/shared/services/favorites/favorites.service';

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
