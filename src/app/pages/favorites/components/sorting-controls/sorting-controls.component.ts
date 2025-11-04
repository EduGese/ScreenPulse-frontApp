import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { FavoritesSearchParams } from 'src/app/shared/models/favoritesSearchParams.model';

/**
 * 
 * Sorting, filtering, and media-type selection controls for the favorites collection.
 * 
 */
@Component({
  selector: 'app-sorting-controls',
  templateUrl: './sorting-controls.component.html',
  styleUrls: ['./sorting-controls.component.scss']
})
export class SortingControlsComponent {
  /**
   * Current sort state from parent component
   * 
   * @type {FavoritesSearchParams}
   * @see FavoritesSearchParams interface for structure
   */
  @Input() currentSort!: FavoritesSearchParams;

    /**
   * Emits when user clicks sort icons
   * 
   * Payload: `{ field: 'title' | 'year', order: 1 | -1 }`
   * - `order: 1` = ascending (expand_more ↓)
   * - `order: -1` = descending (expand_less ↑)
   * 
   * @event sortChange
   * @type {EventEmitter<{field: string, order: number}>}
   */
  @Output() sortChange: EventEmitter<{ field: string; order: number; }> = new EventEmitter<{field: string, order: number}>();

  /**
   * Emits when user types in the filter input
   * 
   * Payload: User input string (raw value from input.value)
   * 
   * @recommendation Parent should implement debounce (300-500ms)
   * @event filterChange
   * @type {EventEmitter<string>}
   */
  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();

    /**
   * Emits when user toggles media type buttons
   * 
   * Payload: 'movie' | 'series' | 'game' | 'all'
   * 
   * @event mediaTypeChange
   * @type {EventEmitter<string>}
   */
  @Output() mediaTypeChange: EventEmitter<string> = new EventEmitter<string>();

  handleSort(field: 'title' | 'year'): void {
    this.sortChange.emit({
      field,
      order: this.currentSort.sortField === field ? 
             (this.currentSort.sortOrder === 1 ? -1 : 1) : 1
    });
  }

  handleFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.filterChange.emit(value);
  }

  handleMediaTypeChange(event: MatButtonToggleChange): void {
    this.mediaTypeChange.emit(event.value);
  }

}
