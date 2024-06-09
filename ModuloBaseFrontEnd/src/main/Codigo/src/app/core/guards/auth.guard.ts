import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.currentUserValueStore();

        const hashLogin = '/'+environment.maLongin;
       
        let hash = '';

        route.url.forEach(ur => {
            hash = hash + '/' + ur.path;
        })

        if (currentUser) {
            if (hash === hashLogin) {
                this.router.navigate([environment.maDashboard], {}); // queryParams: { returnUrl: state.url }
                return false;
            }

            // logged in so return true
            return true;
        }

        if (hash === hashLogin) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate([environment.maLongin], {});// queryParams: { returnUrl: state.url }
        return false;
    }
}