import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                // Auto logout if 401 response returned from api
                authService.logout();
            }

            const err = error.error?.message || error.statusText;
            console.error('Global Error Interceptor:', err);
            return throwError(() => error);
        })
    );
};
