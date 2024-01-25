import { TestBed, getTestBed } from '@angular/core/testing';

import { TokenGuard } from './token.guard';
import { TokenService } from '../services/token/token.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('tokenGuard', () => {
  let injector: TestBed;
  let tokenService: TokenService;
  let guard: TokenGuard;
  let routeMock: any = { snapshot: {} };
  let routeStateMock: any = { snapshot: {}, url: '/cookies' };
  let routerMock = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenGuard, { provide: Router, useValue: routerMock }],
      imports: [HttpClientTestingModule],
    });
    injector = getTestBed();
    tokenService = injector.inject(TokenService);
    guard = injector.inject(TokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect an unauthenticated user to the main route', () => {
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['']);
  });

  it('should allow an authenticated user to access app', () => {
    spyOn(tokenService, 'getToken').and.returnValue(
      'fgjkhfdskjhgw4u38i7y45328ghjsdf67'
    );
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
  });
});
