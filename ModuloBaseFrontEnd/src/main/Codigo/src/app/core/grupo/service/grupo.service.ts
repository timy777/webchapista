import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '@app/core/global/endpoints';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { CrudService } from '@app/core/global/crud.service';
import { GrupoInput } from '../dto/grupo.input';
import { GrupoOutput } from '../dto/grupo.output';

@Injectable({ providedIn: 'root' })
export class GrupoService extends CrudService<GrupoInput, GrupoOutput, string> {

  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService, Endpoints.GRUPOS);
  }

}