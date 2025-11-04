import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingControlsComponent } from './sorting-controls.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

describe('SortingControlsComponent', () => {
  let component: SortingControlsComponent;
  let fixture: ComponentFixture<SortingControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortingControlsComponent],
      imports: [
        MatIconModule,
        MatButtonToggleModule,
      ]
    });
    fixture = TestBed.createComponent(SortingControlsComponent);
    component = fixture.componentInstance;
    component.currentSort = {
      sortField: 'title',
      sortOrder: -1,
      currentPage: 1,    
      pageSize: 10       
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
