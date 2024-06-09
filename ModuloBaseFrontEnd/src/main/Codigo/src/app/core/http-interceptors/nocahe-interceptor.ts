import { AuthService } from '@app/core/auth/login/service/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler,HttpEvent  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NoCaheInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clona la solicitud para agregar las cabeceras de no caché
        const clonedReq = req.clone({
            setHeaders: {
                'Cache-Control': 'no-store',
                'Pragma': 'no-cache'
            }
        });

        return next.handle(clonedReq);
    }
}