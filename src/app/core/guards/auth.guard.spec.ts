import { TestBed } from '@angular/core/testing';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service'; 

describe('AuthGuard', () => {
  const authServiceStub = { isAuthenticated: () => of(true) }; 
  const routerStub = {}; 

  const executeGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
    TestBed.runInInjectionContext(() => new AuthGuard(authServiceStub as unknown as AuthService, routerStub as any).canActivate());

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
