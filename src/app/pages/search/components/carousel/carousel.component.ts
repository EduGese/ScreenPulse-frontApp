import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MediaItem } from 'src/app/shared/models/movie.model';

/**
 * Displays a **carousel of media items** grouped into slides using ng-bootstrap.
 * 
 * ## Features
 * 
 * - 🎠 Auto-rotating carousel with 4-second intervals
 * - 📸 Groups items into slides of 4 items each
 * - ♿ Fully accessible with ARIA labels and keyboard navigation
 * - 🖼️ Automatic fallback image on poster load errors
 * - 🎯 Emits events when user clicks on a media item
 * 
 * ## Key Capabilities
 * 
 * The component provides an interactive carousel with:
 * - **Automatic slide transitions** every 4 seconds
 * - **Navigation indicators** (dots) for manual slide selection
 * - **Keyboard accessible** poster images with Enter/Space handlers
 * - **Performance optimized** with trackBy functions
 * - **Responsive grouping** that adapts to collection size
 */
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnChanges {
  
  /** Collection of media items to display in the carousel */
  @Input() collection: MediaItem[] = [];
  
  /** Emits the selected media item when user clicks on it */
  @Output() sendItemCarousel = new EventEmitter<MediaItem>();

  /** Default fallback image URL when poster fails to load */
  readonly noImageUrl = 'assets/images/no_poster.jpg';
  
  /** Controls visibility of carousel navigation arrows (disabled by default) */
  showNavigationArrows = false;
  
  /** Controls visibility of carousel navigation indicators (enabled by default) */
  showNavigationIndicators = true;
  
  /** Items grouped into arrays for carousel slides */
  groupedItems: MediaItem[][] = [];
  
  /** Number of items per carousel slide */
  private readonly groupSize = 4;

  /**
   * Lifecycle hook: initializes the component
   * Groups the media items into slides on component initialization
   */
  ngOnInit(): void {
    this.groupItems();
  }
  
  /**
   * Lifecycle hook: responds to input property changes
   * Re-groups items when the collection input changes (except first change)
   * 
   * @param changes - Object containing the changed properties
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['collection'] && !changes['collection'].firstChange) {
      this.groupItems();
    }
  }

  /**
   * TrackBy function for carousel slide groups
   * Used to optimize ngFor rendering performance at the slide level
   * 
   * @param index - The current index in the array
   * @returns The index as unique identifier for each slide group
   */
  trackByFn(index: number): number {
    return index;
  }
  
  /**
   * TrackBy function for individual media items within slides
   * Used to optimize ngFor rendering performance at the item level
   * 
   * @param index - The current index in the array
   * @param item - The media item object
   * @returns The unique IMDB ID of the media item
   */
  trackByItem(index: number, item: MediaItem): string {
    return item.imdbID;
  }

  /**
   * Groups the media items into arrays of fixed size for carousel slides
   * Each slide will contain up to `groupSize` items (default: 4)
   * 
   * @private
   */
  private groupItems(): void {
    this.groupedItems = Array.from(
      { length: Math.ceil(this.collection.length / this.groupSize) },
      (_, i) => this.collection.slice(i * this.groupSize, (i + 1) * this.groupSize)
    );
  }

  /**
   * Handles user interaction when clicking on a media item
   * Emits the selected item to the parent component
   * 
   * @param item - The media item that was clicked
   */
  onOpenItem(item: MediaItem): void {
    this.sendItemCarousel.emit(item);
  }

  /**
   * Handles image loading errors by setting a fallback image
   * Automatically replaces broken poster images with the default placeholder
   * 
   * @param event - The error event from the image element
   */
  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = this.noImageUrl; 
  }
}
