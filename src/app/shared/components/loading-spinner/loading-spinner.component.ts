import { Component, Input } from '@angular/core';

/**
 * LoadingSpinnerComponent displays a loading indicator with a progress bar.
 * 
 * This component shows an Angular Material indeterminate progress bar along with 
 * a message when the `visible` input is true. The spinner is hidden when `visible` is false.
 * 
 * @example
 * <app-loading-spinner [visible]="true"></app-loading-spinner>
 */
@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {

  /**
   * If true, the loading spinner and message are visible.
   * If false, they are hidden.
   * 
   * @default false
   */
  @Input() visible!: boolean;
}
