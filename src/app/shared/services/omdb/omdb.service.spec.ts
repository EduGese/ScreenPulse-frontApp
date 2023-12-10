import { TestBed } from '@angular/core/testing';

import { OmdbService } from './omdb.service';
import { HttpClientModule } from '@angular/common/http';

describe('OmdbService', () => {
  let service: OmdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(OmdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
