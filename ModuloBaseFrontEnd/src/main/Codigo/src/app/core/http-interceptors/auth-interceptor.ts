import { AuthService } from '@app/core/auth/login/service/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private router: Router) { }

    intercept(reqOri: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        const authToken = this.auth.currentUserValueStore();

        const token = (authToken === null) ? '' : authToken.token;

        const authReq = reqOri.clone({ setHeaders: { Authorization: 'Bearer ' + token, 'X-Forwarded-For': '127.0.0.1', 'Route': this.router.url} });

        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.

        //const authReq = reqOri.clone({ setHeaders: { Authorization: 'Bearer ' + token, 'X-Forwarded-For': '127.0.0.1' } });

        // clone request and replace 'http://' with 'https://' at the same time
        //let secureReq = authReq.clone({
        //    url: req.url.replace('http://', 'https://')
        //});

        // send the cloned, "secure" request to the next handler.
        return next.handle(authReq);
    }
}