import { TestBed } from '@angular/core/testing';

import { FavoritesFilterService } from './favorites-filter.service';

describe('FavoritesFilterService', () => {
  let service: FavoritesFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
