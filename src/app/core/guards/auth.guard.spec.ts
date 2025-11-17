import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceStub: jasmine.SpyObj<AuthService>;
  let routerStub: jasmine.SpyObj<Router>;
  let toastrServiceStub: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    // Crear stubs (mocks) de las dependencias
    authServiceStub = jasmine.createSpyObj('AuthService', ['isLoggedInObservable']);
    routerStub = jasmine.createSpyObj('Router', ['navigate']);
    toastrServiceStub = jasmine.createSpyObj('ToastrService', ['warning']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: ToastrService, useValue: toastrServiceStub }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when user is logged in', (done) => {
    // Simular usuario autenticado
    authServiceStub.isLoggedInObservable.and.returnValue(of(true));

    guard.canActivate().subscribe(result => {
      expect(result).toBe(true);
      expect(routerStub.navigate).not.toHaveBeenCalled();
      expect(toastrServiceStub.warning).not.toHaveBeenCalled();
      done();
    });
  });

  it('should deny access and redirect to /auth/login when user is not logged in', (done) => {
    // Simular usuario NO autenticado
    authServiceStub.isLoggedInObservable.and.returnValue(of(false));

    guard.canActivate().subscribe(result => {
      expect(result).toBe(false);
      expect(routerStub.navigate).toHaveBeenCalledWith(['/auth/login']);
      expect(toastrServiceStub.warning).toHaveBeenCalledWith(
        'You must be logged in to access this page.',
        'Access Denied'
      );
      done();
    });
  });
});
