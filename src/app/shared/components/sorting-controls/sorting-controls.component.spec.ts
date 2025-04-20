import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingControlsComponent } from './sorting-controls.component';

describe('SortingControlsComponent', () => {
  let component: SortingControlsComponent;
  let fixture: ComponentFixture<SortingControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortingControlsComponent]
    });
    fixture = TestBed.createComponent(SortingControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
