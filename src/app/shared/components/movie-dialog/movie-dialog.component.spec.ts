import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaItemDialogComponent } from './movie-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

describe('MediaItemDialogComponent', () => {
  let component: MediaItemDialogComponent;
  let fixture: ComponentFixture<MediaItemDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaItemDialogComponent],
      imports:[MatDialogModule, 
        ToastrModule.forRoot(),
         HttpClientModule,
         MatIconModule ],
      providers:[
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} } 
      ]
    });
    fixture = TestBed.createComponent(MediaItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
