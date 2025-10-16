// trailer-dialog.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TrailerDialogComponent } from './trailer-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';

describe('TrailerDialogComponent', () => {
  let component: TrailerDialogComponent;
  let fixture: ComponentFixture<TrailerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrailerDialogComponent ],
      imports: [ 
        MatIconModule, 
        MatButtonModule,
        BrowserModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { videoUrl: 'https://www.youtube.com/watch?v=test' } },
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TrailerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
