import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesCardComponent } from './favorites-card.component';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('FavoritesCardComponent', () => {
  let component: FavoritesCardComponent;
  let fixture: ComponentFixture<FavoritesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesCardComponent],
      providers: [StorageService,
        ToastrService],
        imports: [
          ToastrModule.forRoot({
          })
        ]
    });
    fixture = TestBed.createComponent(FavoritesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
