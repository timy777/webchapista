import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Endpoints } from '@app/core/global/endpoints';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { CrudService } from '@app/core/global/crud.service';
import { EtiquetaInput } from '../dto/etiqueta.input';
import { EtiquetaOutput } from '../dto/etiqueta.output';
import { HttpResponseUtil } from '@app/core/global/http.response.util';

@Injectable({ providedIn: 'root' })
export class EtiquetaService extends CrudService<EtiquetaInput, EtiquetaOutput, string> {

  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService, Endpoints.ETIQUETAS);
  }

  async obtenerPorLlave(llave: string): Promise<EtiquetaOutput[]> {
    while (CrudService.CONTEXTO === null) {
      await CrudService.initializar(this.http);
    }

    /*if (CrudService.CONTEXTO === null) {
      await CrudService.initializar(this.http);
    }*/

    return this.http.post<string>(CrudService.CONTEXTO + Endpoints.ETIQUETA_POR_LLAVE, [llave]).
      toPromise().then((response: any) => {
        return Promise.resolve(response);
      }).catch(error => HttpResponseUtil.handleErrorGeneric(error, this.authService));
  }

  async obtenerPorGrupo(grupo: string): Promise<EtiquetaOutput[]> {
    while (CrudService.CONTEXTO === null) {
      await CrudService.initializar(this.http);
    }    

    return this.http.post<string>(CrudService.CONTEXTO + Endpoints.ETIQUETA_POR_GRUPO, [grupo]).
      toPromise().then((response: any) => {
        return Promise.resolve(response);
      }).catch(error => HttpResponseUtil.handleErrorGeneric(error, this.authService));
  }

}