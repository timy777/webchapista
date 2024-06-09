import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '@app/core/global/endpoints';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { ModuloOutput } from '@app/core/auth/login/dto/modulo.output';
import { HttpResponseUtil } from '@app/core/global/http.response.util';
import { AccionOutput } from '@app/core/auth/login/dto/accion.output';
import { PermisoInput } from '../dto/permiso.input';
import { RolTipoParametroPermisoOutput } from '../dto/rol.tipo.parametro.permiso.output';
import { RolTipoParametroPermisoInput } from '../dto/rol.tipo.parametro.permiso.input';
import { CrudService } from '@app/core/global/crud.service';

@Injectable({ providedIn: 'root' })
export class PermisoService {

    constructor(private http: HttpClient, private authService: AuthService) { }

    public async obtenerPlantillaPermisos(): Promise<ModuloOutput[]> {
        while (CrudService.CONTEXTO === null) {
            await CrudService.initializar(this.http);
        }

        return this.http.get<ModuloOutput[]>(CrudService.CONTEXTO + Endpoints.PERMISOS).
            toPromise().then((response: any) => {
                return Promise.resolve(response);
            }).catch(error => HttpResponseUtil.handleErrorGeneric(error, this.authService));
    }

    public async obtenerPermisosPorRol(rolId: string): Promise<AccionOutput[]> {
        console.log('rolId ', rolId)
        while (CrudService.CONTEXTO === null) {
            await CrudService.initializar(this.http);
        }

        return this.http.get<AccionOutput[]>(CrudService.CONTEXTO + Endpoints.PERMISOS_POR_ROL + rolId).
            toPromise().then((response: any) => {
                return Promise.resolve(response);
            }).catch(error => HttpResponseUtil.handleErrorGeneric(error, this.authService));
    }

    public async guardarPermisosPorRol(input: PermisoInput): Promise<any> {
        while (CrudService.CONTEXTO === null) {
            await CrudService.initializar(this.http);
        }

        return this.http.post<any>(CrudService.CONTEXTO + Endpoints.PERMISOS, input).
            toPromise().then((response: any) => {
                return Promise.resolve(response);
            }).catch(error => HttpResponseUtil.handleErrorGeneric(error, this.authService));
    }

    public async obtenerRolTiposParametrosPermisosPorRol(rolId:string): Promise<RolTipoParametroPermisoOutput[]> {
        while (CrudService.CONTEXTO === null) {
            await CrudService.initializar(this.http);
        }

        return this.http.get<RolTipoParametroPermisoOutput[]>(CrudService.CONTEXTO + Endpoints.ROL_TIPO_PARAMETRO_PERMISOS_POR_ROL + rolId).
            toPromise().then((response: any) => {
                return Promise.resolve(response);
            }).catch(error => HttpResponseUtil.handleErrorGeneric(error, this.authService));
    }

    public async guardarRolTiposParametrosPermisosPermisosPorRol(input: RolTipoParametroPermisoInput): Promise<any> {
        while (CrudService.CONTEXTO === null) {
            await CrudService.initializar(this.http);
        }

        return this.http.post<any>(CrudService.CONTEXTO + Endpoints.ROL_TIPO_PARAMETRO_PERMISOS, input).
            toPromise().then((response: any) => {
                return Promise.resolve(response);
            }).catch(error => HttpResponseUtil.handleErrorGeneric(error, this.authService));
    }
}