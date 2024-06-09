import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Endpoints } from '@app/core/global/endpoints';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { RolOutput } from '../dto/rol.output';
import { RolInput } from '../dto/rol.input';
import { CrudService } from '@app/core/global/crud.service';
import { Page } from '@app/core/global/page';
import { Paginacion } from '@app/core/global/paginacion';
import { HttpResponseUtil } from '@app/core/global/http.response.util';

@Injectable({ providedIn: 'root' })
export class RolService extends CrudService<RolInput, RolOutput, string> {

  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService, Endpoints.ROLES);
  }

}