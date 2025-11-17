import { Component, Input } from '@angular/core';

/**
 * Displays an empty state message with an optional image.
 *
 * @example
 * <app-empty-state></app-empty-state>
 * <app-empty-state message="No results found." imageUrl="assets/images/empty.png"></app-empty-state>
 */
@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent {

  /**
   * Message shown to the user.
   * @default "Upps..We didn't find anything..."
   */
  @Input() message = "Upps..We didn't find anything...";

  /**
   * URL of the image to display.
   * @default "assets/images/monkey3.jpg"
   */
  @Input() imageUrl = "/assets/images/monkey3.jpg";

  /**
   * Alt text for the image.
   * @default "empty state image"
   */
  @Input() alt = 'empty state image';

}
