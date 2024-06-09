import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Endpoints } from '@app/core/global/endpoints';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { CrudService } from '@app/core/global/crud.service';
import { ParametroInput } from '../dto/parametro.input';
import { ParametroOutput } from '../dto/parametro.output';
import { Page } from '@app/core/global/page';
import { Paginacion } from '@app/core/global/paginacion';
import { HttpResponseUtil } from '@app/core/global/http.response.util';

@Injectable({ providedIn: 'root' })
export class ParametroService extends CrudService<ParametroInput, ParametroOutput, string> {

  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService, Endpoints.PARAMETROS);
  }

}