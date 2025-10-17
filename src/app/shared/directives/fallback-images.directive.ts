import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'img[appFallback]'
})
export class FallbackImagesDirective {
  @Input() appFallback?: string;
  private hasError = false;
  
  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  onError(): void {
    if (this.hasError) return;
    this.hasError = true;
    const fallbackUrl = this.appFallback || '/assets/images/no_poster.jpg';
    this.el.nativeElement.src = fallbackUrl;
  }
}
