import { ErrorDialogComponent } from './../components/error-dialog/error-dialog.component';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private _snack_bar: MatSnackBar) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
          this._snack_bar.openFromComponent(ErrorDialogComponent, {
            data: errorMsg,
            duration: 2000,
            panelClass: ['red-snackbar'],
          });
        } else {
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          this._snack_bar.openFromComponent(ErrorDialogComponent, {
            data: errorMsg,
            duration: 2000,
            panelClass: ['red-snackbar'],
          });
        }
        return throwError(errorMsg);
      })
    );
  }
}
