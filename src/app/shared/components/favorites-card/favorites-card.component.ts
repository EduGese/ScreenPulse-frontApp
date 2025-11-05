import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MediaItem } from '../../models/movie.model';

/**
 * 
 * Card component for displaying media items (movies, series, games) with dual view/edit modes.
 * 
 * 
 */
@Component({
  selector: 'app-favorites-card',
  templateUrl: './favorites-card.component.html',
  styleUrls: ['./favorites-card.component.scss'],
})
export class FavoritesCardComponent implements OnInit, OnChanges{
  /**
 * Media item to display in the card
 * @type {MediaItem}
 */
  @Input() item: MediaItem = {} as MediaItem;

  @Input() initialHoverstate = false; 

/**
 * Emitted when delete button is clicked
 * @event {string} itemId
 */
@Output() itemToDelete = new EventEmitter<string>();

/**
 * Emitted when poster is clicked to open item details
 * @event {MediaItem} item
 */
@Output() itemToOpen = new EventEmitter<MediaItem>();

/**
 * Emitted when user saves a review/note
 * @event {MediaItem} item - with description populated
 */
@Output() descriptionToAdd = new EventEmitter<MediaItem>();

/**
 * Emitted when user deletes a review/note
 * @event {MediaItem} item - with description cleared
 */
@Output() descriptionToDelete = new EventEmitter<MediaItem>();

  backgroundUrl = '';

  mode = 'view';
  inputDescription = '';
  hoverState = false;

  viewportWidth!: number;

  ngOnInit() {
    this.backgroundUrl = this.item.poster;
    this.hoverState = this.initialHoverstate; 
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialHoverstate']) {
      this.hoverState = changes['initialHoverstate'].currentValue;
    }
  }

  handleDescriptionToAdd() {
    const mediaItemWithDescription = {
      ...this.item,
      description: this.inputDescription,
    };
    this.descriptionToAdd.emit(mediaItemWithDescription);
    this.mode = 'view';
  }
  handleDescriptionToDelete() {
    const itemWithoutDescription = {
      ...this.item,
      description: '',
    };
    this.descriptionToDelete.emit(itemWithoutDescription);
    this.inputDescription = '';
    this.mode = 'view';
  }
  handleValueChange(event: Event): void {
    this.inputDescription = (event.target as HTMLTextAreaElement).value;
  }
  handleItemToDelete(event: MouseEvent) {
    event.stopPropagation();
    this.itemToDelete.emit(this.item._id);
  }

  toggleMode(event: MouseEvent): void {
    event.stopPropagation();
    this.mode = this.mode === 'view' ? 'edition' : 'view';
  }
  handleMouseEnter() {
    this.hoverState = true;
  }
  handleMouseLeave() {
    this.hoverState = false;
  }
  areButtonsVisible(): boolean {
    if (this.viewportWidth <= 1024) {
      return true;
    }
    return this.hoverState;
  }
  openitemToOpen(item: MediaItem) {
    this.hoverState = false;
    this.itemToOpen.emit(item);
  }
  setDefaultBackground() {
    this.backgroundUrl = 'assets/images/no_poster.jpg'; 
  }
}
