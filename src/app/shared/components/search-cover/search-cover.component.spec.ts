import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCoverComponent } from './search-cover.component';

describe('SearchCoverComponent', () => {
  let component: SearchCoverComponent;
  let fixture: ComponentFixture<SearchCoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchCoverComponent]
    });
    fixture = TestBed.createComponent(SearchCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
