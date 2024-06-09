import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Endpoints } from '@app/core/global/endpoints';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { CrudService } from '@app/core/global/crud.service';
import { LogSistemaOutput } from '../dto/log.sistema.output';

@Injectable({ providedIn: 'root' })
export class LogSistemaService extends CrudService<any, LogSistemaOutput, number> {

    constructor(http: HttpClient, authService: AuthService) {
        super(http, authService, Endpoints.LOG_SISTEMA);
    }

}