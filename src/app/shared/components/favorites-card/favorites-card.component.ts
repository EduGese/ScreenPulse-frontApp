import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';



@Component({
  selector: 'app-favorites-card',
  templateUrl: './favorites-card.component.html',
  styleUrls: ['./favorites-card.component.css'],
})
export class FavoritesCardComponent implements OnChanges {
  @Input() items!: any[];
  @Output() itemIdEvent = new EventEmitter<string>();
  @Output() itemUpdatedEvent = new EventEmitter<any>();

  toggleModes: string[] = [];

  index: number = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'] && changes['items'].currentValue) {
      this.toggleModes = this.items.map(() => 'view');
    }
  }

  getId(i: number) {
    this.index = i;
  }

  addDescription(item: any, description: any, i: number) {
    const itemInfo = {
      item: item,
      description: description,
    };
    this.itemUpdatedEvent.emit(itemInfo);
    this.toggleModes[i] = 'view';
  }
  sendItemId(id: string) {
    this.itemIdEvent.emit(id);
  }
}
