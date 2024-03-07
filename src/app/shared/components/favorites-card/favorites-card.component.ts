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
  descriptions: string[] = [];
  hoverStates: boolean[] = []; 



  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'] && changes['items'].currentValue) {
      this.toggleModes = this.items.map(() => 'view');
      this.descriptions = this.items.map(() => '');
      this.hoverStates = this.items.map(() => false);
    }
  }

  getId(i: number) {
    this.index = i;
  }

  addDescription(item: any, i: number) {
    const itemInfo = {
      item: item,
      description: this.descriptions[i],
    };
    this.itemUpdatedEvent.emit(itemInfo);
    this.toggleModes[i] = 'view';
  }
  sendItemId(id: string) {
    this.itemIdEvent.emit(id);
  }
  onValueChange(event: Event, index: number): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.descriptions[index] = value;
  }
  toggleMode(index: number): void {
    this.toggleModes[index] = this.toggleModes[index] === 'view' ? 'edition' : 'view';
  }
  onMouseEnter(index: number){
    this.hoverStates[index] = true;
  }
  onMouseLeave(index: number){
    this.hoverStates[index] = false;
  }
  areButtonsVisible(index: number): boolean {
    return this.hoverStates[index];
  }
  

}
