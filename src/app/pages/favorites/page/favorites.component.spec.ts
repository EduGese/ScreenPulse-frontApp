import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { FavoritesComponent } from './favorites.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { OmdbService } from 'src/app/shared/services/omdb/omdb.service';
import { FavoritesService } from 'src/app/shared/services/favorites/favorites.service';
import { NavbarComponent } from 'src/app/layout/navbar/navbar.component';



const favoritesServiceStub = {
  getFavorites: jasmine.createSpy('getFavorites').and.returnValue(of({
    favorites: [],
    totalFavorites: 0,
    currentPage: 1,
    pageSize: 10
  })),
  addToFavorites: jasmine.createSpy('addToFavorites').and.returnValue(of({})),
  deleteMediaItem: jasmine.createSpy('deleteMediaItem').and.returnValue(of({})),
  updateFavorite: jasmine.createSpy('updateFavorite').and.returnValue(of({}))
};

const omdbServiceStub = {
  search: jasmine.createSpy('search').and.returnValue(of([]))
};
const dialogServiceStub = {
  open: jasmine.createSpy('open')
};

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
        MatDialogModule,
        MatProgressBarModule,
        SharedModule,
        MatPaginatorModule
      ],
      providers: [
        ToastrService,
        { provide: FavoritesService, useValue: favoritesServiceStub },
        { provide: OmdbService, useValue: omdbServiceStub },
        { provide: DialogService, useValue: dialogServiceStub }
      ]
    });

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
