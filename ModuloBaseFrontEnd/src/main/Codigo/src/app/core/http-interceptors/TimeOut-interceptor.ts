import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { SessionStorageUtil } from '../global/utils/sesion.storage.util';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  
  constructor(@Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let timeoutValue = req.headers.get('timeout') || this.defaultTimeout;
    let stringValidate = "";

    //timeout_backend
    //if (sessionStorage.getItem('timeout_backend') !== null) {
    if (SessionStorageUtil.existItem('timeout_backend')) {
      //timeoutValue = this.decryptAES(sessionStorage.getItem('timeout_backend'));
      timeoutValue = SessionStorageUtil.getItemDencryt('timeout_backend');
    }

    //if (sessionStorage.getItem('url_no_timeout_backend') !== null) {
    if (SessionStorageUtil.existItem('url_no_timeout_backend')) {
      //stringValidate = this.decryptAES(sessionStorage.getItem('url_no_timeout_backend'));
      stringValidate = SessionStorageUtil.getItemDencryt('url_no_timeout_backend');
    }
    //console.log('timeout=' + stringValidate);
    const timeoutValueNumeric = Number(timeoutValue);
    if (this.esUrlSinTimeout(req.url, stringValidate)) {
      //console.log('req: ' + req.url + ' si');
      return next.handle(req);
    } else {
      //console.log('req: ' + req.url + ' no');
      return next.handle(req).pipe(timeout(timeoutValueNumeric));
    }
  }

  public esUrlSinTimeout(url: string, stringValidate: string): boolean {
    //stringValidate = "/tr4-sftp-reprocesar,/parametro,/bitacoratr4";
    let salida = false;
    if(stringValidate == null) return false;
    if(stringValidate == '') return false;

    let urlsValidate = stringValidate.split(',');
    urlsValidate.forEach((ele) => {
      if(url.includes(ele.trim())) {
        salida = true;        
      }
    });
    return salida;
  }
}