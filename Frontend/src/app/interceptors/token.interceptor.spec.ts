import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

describe('TokenInterceptor', () => {
  let client: HttpClient;
  let httpController: HttpTestingController;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    });
    client = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should add authorization poperty in header', () => {
    spyOn(localStorageService, 'get').and.returnValue('345jrhgb78y23jh4gsdfvb');

    client.get(`https://localhost:3000/api/test`).subscribe((res) => {
      expect(res).toBeTruthy();
    });
    const httpReq = httpController.expectOne(`https://localhost:3000/api/test`);

    expect(httpReq.request.headers.has('Authorization')).toEqual(true);
    expect(httpReq.request.headers.get('Authorization')).toBe(
      'Bearer 345jrhgb78y23jh4gsdfvb'
    );
  });

  it('should not add authorization poperty in header when route is user/create', () => {
    spyOn(localStorageService, 'get').and.returnValue('345jrhgb78y23jh4gsdfvb');

    client.get(`https://localhost:3000/api/user/create`).subscribe((res) => {
      expect(res).toBeTruthy();
    });
    const httpReq = httpController.expectOne(
      `https://localhost:3000/api/user/create`
    );

    expect(httpReq.request.headers.has('Authorization')).toEqual(false);
  });

  it('should not add authorization poperty in header when route is user/auth', () => {
    spyOn(localStorageService, 'get').and.returnValue('345jrhgb78y23jh4gsdfvb');

    client.get(`https://localhost:3000/api/user/auth`).subscribe((res) => {
      expect(res).toBeTruthy();
    });
    const httpReq = httpController.expectOne(
      `https://localhost:3000/api/user/auth`
    );

    expect(httpReq.request.headers.has('Authorization')).toEqual(false);
  });
});
