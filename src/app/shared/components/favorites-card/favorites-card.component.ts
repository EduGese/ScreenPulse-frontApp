import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MediaItem } from '../../models/movie.model';

@Component({
  selector: 'app-favorites-card',
  templateUrl: './favorites-card.component.html',
  styleUrls: ['./favorites-card.component.scss'],
})
export class FavoritesCardComponent {
  @Input() item!: MediaItem;

  @Output() itemToDelete = new EventEmitter<string>();
  @Output() itemToOpen = new EventEmitter<any>();
  @Output() descriptionToDelete = new EventEmitter<MediaItem>();
  @Output() descriptionToAdd = new EventEmitter<MediaItem>();
 

  mode: string = 'view';
  inputDescription: string = '';
  hoverState: boolean = false;

  viewportWidth: number = window.innerWidth;


  constructor() { }

  onDescriptionToAdd() {
    const mediaItemWithDescription = {
      ...this.item,
      description: this.inputDescription,
    };
    this.descriptionToAdd.emit(mediaItemWithDescription);
    this.mode = 'view';
  }
  onDescriptionToDelete() {
    const itemWithoutDescription = {
      ...this.item,
      description: '',
    };
    this.descriptionToDelete.emit(itemWithoutDescription);
  }
  onValueChange(event: Event): void {
    this.inputDescription = (event.target as HTMLTextAreaElement).value;
  }
  onItemToDelete( event: MouseEvent) {
    event.stopPropagation();
    this.itemToDelete.emit(this.item._id);
  }

  toggleMode(event: MouseEvent): void {
    event.stopPropagation();
    this.mode = this.mode === 'view' ? 'edition' : 'view';
  }
  onMouseEnter() {
    this.hoverState = true;
  }
  onMouseLeave() {
    this.hoverState = false;
  }
  areButtonsVisible(): boolean {
    if (this.viewportWidth <= 1024) {
      return true;
    }
    return this.hoverState;
  }
  openitemToOpen(item: any) {
    this.hoverState = false;
    this.itemToOpen.emit(item);
  }
}
