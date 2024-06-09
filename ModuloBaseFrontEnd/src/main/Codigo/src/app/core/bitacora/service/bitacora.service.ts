import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Endpoints } from '@app/core/global/endpoints';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { BitacoraOutput } from '../dto/bitacora.output';
import { CrudService } from '@app/core/global/crud.service';

@Injectable({ providedIn: 'root' })
export class BitacoraService extends CrudService<any, BitacoraOutput, number> {

    constructor(http: HttpClient, authService: AuthService) {
        super(http, authService, Endpoints.BITACORAS);
    }

}