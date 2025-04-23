import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = 'An unknown error occurred.';
        switch (error.status) {
          case 0:
            message = 'Cannot connect to server. Please check your internet connection';
            break;
          case 401:
            message = 'Unauthorized access. Please login again';
            break;
          case 404:
            message = 'The favorite you are trying to delete could not be found in your list. Please try again later.';
            break;
          case 409:
            if (error.error.code === 'USER_EXISTS') {
              message = 'User with this email already exists';
            }
            if (error.error.code === 'FAVORITE_EXISTS') {
              message = 'Media item already in favorites';
            }
            break;
          default:
            message = 'An unexpected error occurred. Please try again later';
            break;
        }

        return throwError(() => ({
          message,
          status: error.status,
        }));
      })
    );
  }
}
