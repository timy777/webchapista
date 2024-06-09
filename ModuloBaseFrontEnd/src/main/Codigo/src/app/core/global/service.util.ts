import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/login/service/auth.service';
import { HttpResponseUtil } from './http.response.util';
import { Paginacion } from './paginacion';

export class ServiceUtil {    

    public static get<T>(http: HttpClient, authService: AuthService, url: string): Promise<T> {
        return http.get<T>(url).
            toPromise().then((response: any) => {
                return Promise.resolve(response);
            }).catch(error => HttpResponseUtil.handleErrorGeneric(error, authService));
    }

    public static list<T>(http: HttpClient, authService: AuthService, url: string,
        parametros?: Map<string, string>, input?: Paginacion): Promise<T> {
        let hp: HttpParams;

        hp = new HttpParams();        
        if (input === null || input === undefined) {
            hp = hp.set('size', '2000').set('page', '0');
        } else {
            if (input.sort === null) {
                hp = hp.set('size', input.size.toString()).set('page', input.page.toString());
            } else {
                hp = hp.set('size', input.size.toString()).
                    set('page', input.page.toString()).
                    set('sort', input.sort.col + ',' + input.sort.type);
            }
        }

        if (parametros !== undefined && parametros !== null) {
            parametros.forEach((v, k, pmap) => {
                hp = hp.set(k, v);
            });
        }

        const httpOptions = {
            params: hp
        };
        return http.get<T>(url, httpOptions).
            toPromise().then((response: any) => {
                return Promise.resolve(response);
            }).catch(error => HttpResponseUtil.handleErrorGeneric(error, authService));
    }

    public static create<I, T>(http: HttpClient, authService: AuthService, url: string, input: I): Promise<T> {
        return http.post<T>(url, input).
            toPromise().then((response: any) => {
                return Promise.resolve(response);
            }).catch(error => HttpResponseUtil.handleErrorGeneric(error, authService));
    }

    public static update<I, T>(http: HttpClient, authService: AuthService, url: string, input: I): Promise<T> {
        return http.put<T>(url, input).
            toPromise().then((response: any) => {
                return Promise.resolve(response);
            }).catch(error => HttpResponseUtil.handleErrorGeneric(error, authService));
    }

    public static delete(http: HttpClient, authService: AuthService, url: string): Promise<{}> {
        return http.delete(url).
            toPromise().then((response: any) => {
                return Promise.resolve(response);
            }).catch(error => HttpResponseUtil.handleErrorGeneric(error, authService));
    }
}