import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioInput } from '../dto/usuario.input';
import { UsuarioOutput } from '../dto/usuario.output';
import { Endpoints } from '@app/core/global/endpoints';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { CrudService } from '@app/core/global/crud.service';
import { HttpResponseUtil } from '@app/core/global/http.response.util';

@Injectable({ providedIn: 'root' })
export class UsuarioService extends CrudService<UsuarioInput, UsuarioOutput, string> {

  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService, Endpoints.USUARIOS);
  }

  public async habilitarUsuario(id: number): Promise<{}> {
    while (CrudService.CONTEXTO === null) {
      await CrudService.initializar(this.http);
    }

    return this.http.put<UsuarioOutput>(CrudService.CONTEXTO + Endpoints.HABILITARUSUARIO, id).
      toPromise().then((response: any) => {
        return Promise.resolve(response);
      }).catch(error => HttpResponseUtil.handleErrorGeneric(error, this.authService));
  }

  public async inhabilitarUsuario(id: number): Promise<{}> {
    while (CrudService.CONTEXTO === null) {
      await CrudService.initializar(this.http);
    }

    return this.http.put<UsuarioOutput>(CrudService.CONTEXTO + Endpoints.INHABILITARUSUARIO, id).
      toPromise().then((response: any) => {
        return Promise.resolve(response);
      }).catch(error => HttpResponseUtil.handleErrorGeneric(error, this.authService));
  }

}