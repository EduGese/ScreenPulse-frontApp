import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { FavoritesSearchParams } from '../../models/favoritesSearchParams.model';

@Component({
  selector: 'app-sorting-controls',
  templateUrl: './sorting-controls.component.html',
  styleUrls: ['./sorting-controls.component.css']
})
export class SortingControlsComponent {
  @Input() currentSort!: FavoritesSearchParams;
  @Output() sortChange = new EventEmitter<{field: string, order: number}>();
  @Output() filterChange = new EventEmitter<string>();
  @Output() mediaTypeChange = new EventEmitter<string>();

  onSort(field: 'title' | 'year'): void {
    this.sortChange.emit({
      field,
      order: this.currentSort.sortField === field ? 
             (this.currentSort.sortOrder === 1 ? -1 : 1) : 1
    });
  }

  onFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.filterChange.emit(value);
  }

  onMediaTypeChange(event: MatButtonToggleChange): void {
    this.mediaTypeChange.emit(event.value);
  }

}
