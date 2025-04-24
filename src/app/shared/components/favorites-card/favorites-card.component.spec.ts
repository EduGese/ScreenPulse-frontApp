import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesCardComponent } from './favorites-card.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

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
          }),
          MatCardModule,
          MatTooltipModule,
          MatIconModule,
          NgbPopoverModule
        ]
    });
    fixture = TestBed.createComponent(FavoritesCardComponent);
    component = fixture.componentInstance;
    component.item = {
      title: 'Fake Movie Title',
      poster: 'https://example.com/poster.jpg',
      type: 'movie',
      year: '2023',
      description: 'Esta es una película de prueba.',
      imdbID: 'tt1234567',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
