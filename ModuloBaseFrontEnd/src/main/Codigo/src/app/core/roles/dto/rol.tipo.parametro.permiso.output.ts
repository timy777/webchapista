export class RolTipoParametroPermisoOutput {

    id: number;
    rolId: number;
    tipoParametroId: number;
    tipoParametroNombre: string;
    tipoPermiso: number;

    constructor(id: number, rolId: number, tipoParametroId: number, tipoParametroNombre: string, tipoPermiso: number) {
        this.id = id;
        this.rolId = rolId;
        this.tipoParametroId = tipoParametroId;
        this.tipoParametroNombre = tipoParametroNombre;
        this.tipoPermiso = tipoPermiso;
    }

}