import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authSvc: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authSvc.getCurrentUser();
        // console.log("setting token");
        
        if (currentUser && currentUser.authToken) {
            // console.log(currentUser.authToken);
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.authToken}`
                }
            });
        }

        return next.handle(request);
    }
}