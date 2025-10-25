import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceMock: Partial<AuthService>;
  let router: Router;

  beforeEach(() => {
    // 👇 Mock completo con los dos métodos que usa el componente
    authServiceMock = {
      getUserMailObservable: jasmine.createSpy('getUserMailObservable').and.returnValue(of('')),
      isLoggedInObservable: jasmine.createSpy('isLoggedInObservable').and.returnValue(of(false)),
      logOut: jasmine.createSpy('logOut')
    };

    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatListModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    });
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu', () => {
    expect(component.expanded).toBeFalsy();
    
    component.toggleMenu();
    expect(component.expanded).toBeTruthy();
    
    component.toggleMenu();
    expect(component.expanded).toBeFalsy();
  });

  it('should call logOut and navigate to home', () => {
    spyOn(router, 'navigate');
    
    component.logOut();
    
    expect(authServiceMock.logOut).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
