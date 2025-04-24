import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinnerComponent } from './loading-spinner.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingSpinnerComponent],
      imports: [
        MatProgressBarModule,
      ]
    });
    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
