import { ElementRef } from '@angular/core';
import { FallbackImagesDirective } from './fallback-images.directive';

describe('FallbackImagesDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = { nativeElement: document.createElement('img') } as ElementRef<HTMLImageElement>;
    const directive = new FallbackImagesDirective(elementRefMock);
    expect(directive).toBeTruthy();
  });
});
