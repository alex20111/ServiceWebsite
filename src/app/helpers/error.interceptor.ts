import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authSvc: AuthService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log("Error in error interceptor");
            let error: string;
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authSvc.logout();
                // verify the type of 401 error .. it can be authentication error or token error
                error = err.error.message;
                console.log("401 message: " + error);
                if (error === 'Token') {
                    const navigationExtras: NavigationExtras = {state: {expired: 'Session expired, please log-in'}};
                    this.router.navigate(['login'], navigationExtras);
                } else {
                    this.router.navigate(['login']);
                }
            }
            console.log(err);
            // const error = err.error.message || err.error;
            // console.log("error text from interceptor");
            // console.log(err.status);
            // console.log(err.error);
            // console.log(error);
            return throwError(err);
        }));
    }
}