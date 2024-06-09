export class PermisoInput {

    rolId: number;
    acciones: number[];

    constructor(rolId: number, acciones: number[]) {
        this.rolId = rolId;
        this.acciones = acciones;
    }

}