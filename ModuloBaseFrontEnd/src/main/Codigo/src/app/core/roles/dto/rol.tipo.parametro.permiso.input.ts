export class RolTipoParametroPermisoInput {

    rolId: number;
    tiposParametrosPermisos: TipoParametroPermisoInput[];

    constructor(rolId: number, tiposParametrosPermisos: TipoParametroPermisoInput[]) {
        this.rolId = rolId;
        this.tiposParametrosPermisos = tiposParametrosPermisos;
    }

}

export class TipoParametroPermisoInput {

    tipoParametroId: number;
    tipoPermiso: number;

    constructor(tipoParametroId: number, tipoPermiso: number) {
        this.tipoParametroId = tipoParametroId;
        this.tipoPermiso = tipoPermiso;
    }

}