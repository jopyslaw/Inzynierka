import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: LocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.store.get('token');
    if (request.url !== '/login') {
      if (token) {
        const newRequest = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + token),
        });

        return next.handle(newRequest);
      }
    }
    return next.handle(request);
  }
}
