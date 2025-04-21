import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MediaItem } from '../../models/movie.model';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @Input() collection!: MediaItem[];
  @Output() sendItemCarousel = new EventEmitter<any>();

  showNavigationArrows = true;
  showNavigationIndicators = true;
  groupedItems: MediaItem[][] = [];

  ngOnInit() {
    this.groupItems();
  }

  private groupItems(): void {
    const groupSize = 4;
    this.groupedItems = [];
    
    for (let i = 0; i < this.collection.length; i += groupSize) {
      this.groupedItems.push(this.collection.slice(i, i + groupSize));
    }
  }

  onOpenItem(item: MediaItem): void {
    this.sendItemCarousel.emit(item);
  }
  
}

