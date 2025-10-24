import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MediaItem } from 'src/app/shared/models/movie.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnChanges {
  @Input() collection: MediaItem[] = [];
  @Output() sendItemCarousel = new EventEmitter<MediaItem>();

  showNavigationArrows = false;
  showNavigationIndicators = true;
  groupedItems: MediaItem[][] = [];
  
  private readonly groupSize = 4;

  ngOnInit(): void {
    this.groupItems();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['collection'] && !changes['collection'].firstChange) {
      this.groupItems();
    }
  }

  trackByFn(index: number): number {
    return index;
  }
  
  trackByItem(index: number, item: MediaItem): string {
    return item.imdbID;
  }

  private groupItems(): void {
    this.groupedItems = Array.from(
      { length: Math.ceil(this.collection.length / this.groupSize) },
      (_, i) => this.collection.slice(i * this.groupSize, (i + 1) * this.groupSize)
    );
  }

  onOpenItem(item: MediaItem): void {
    this.sendItemCarousel.emit(item);
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/no_poster.jpg'; 
  }
}
