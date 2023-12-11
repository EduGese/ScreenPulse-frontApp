import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { FormsModule } from '@angular/forms';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FavoritesFilterService } from '../services/favoritesFilterService/favorites-filter.service';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FavoritesCardComponent } from '../components/favorites-card/favorites-card.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FavoritesComponent,
        NavbarComponent,
        FavoritesCardComponent,
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
      ],
      providers: [StorageService, ToastrService, FavoritesFilterService],
    });
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
