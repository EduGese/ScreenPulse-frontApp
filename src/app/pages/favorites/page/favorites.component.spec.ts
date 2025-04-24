import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FavoritesComponent,
        NavbarComponent
      ],
      imports: [
        FormsModule,
        ToastrModule.forRoot(),
        MatIconModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatDialogModule,
        MatProgressBarModule,
        SharedModule,
        MatPaginatorModule,
      ],
      providers: [ToastrService],
    });
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
