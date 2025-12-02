import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('authToken');

  let newReq = req;

  if (token) {
    newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(newReq).pipe(
    catchError((error) => {
      if (error.status === 401 || error.status === 403) {
        console.warn("Token expired or invalid — logging out.");

        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');

        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
