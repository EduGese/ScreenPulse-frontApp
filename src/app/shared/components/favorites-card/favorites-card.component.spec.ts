import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesCardComponent } from './favorites-card.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('FavoritesCardComponent', () => {
  let component: FavoritesCardComponent;
  let fixture: ComponentFixture<FavoritesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesCardComponent],
      providers: [
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
