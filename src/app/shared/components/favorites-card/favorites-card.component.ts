import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorites-card',
  templateUrl: './favorites-card.component.html',
  styleUrls: ['./favorites-card.component.css'],
})
export class FavoritesCardComponent {
  @Input() item!: any;
  @Output() itemIdEvent = new EventEmitter<string>();
  @Output() itemUpdatedEvent = new EventEmitter<any>();
  @Output() sendItemFavoriteEvent = new EventEmitter<any>();

  mode: string = 'view';
  description: string = '';
  hoverState: boolean = false;

  constructor() {}

  addDescription(item: any) {
    const itemInfo = {
      item: item,
      description: this.description,
    };
    this.itemUpdatedEvent.emit(itemInfo);
    this.mode = 'view';
  }
  sendItemId(id: string, event: MouseEvent) {
    event.stopPropagation();
    this.itemIdEvent.emit(id);
  }
  onValueChange(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.description = value;
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
    return this.hoverState;
  }
  openItem(item: any) {
    this.sendItemFavoriteEvent.emit(item);
  }
}
