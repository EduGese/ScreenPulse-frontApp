import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { OmdbService } from 'src/app/shared/services/omdb/omdb.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { SearchCoverComponent } from '../components/search-cover/search-cover.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavbarComponent } from 'src/app/layout/navbar/navbar.component';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';


describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent, NavbarComponent, SearchCoverComponent, CarouselComponent, SearchBarComponent  ],
      providers: [OmdbService, ToastrService, MatDialog ],
      imports: [
        HttpClientModule,
        ToastrModule.forRoot({}),
        SharedModule,
        BrowserAnimationsModule,
        ReactiveFormsModule 
        
         
      ],
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
