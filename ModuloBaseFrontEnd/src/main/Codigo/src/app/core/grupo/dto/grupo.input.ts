export class GrupoInput {

    nombre: string;
    descripcion: string;
    rolId: number;

    constructor(nombre: string, descripcion: string, rolId: number) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.rolId = rolId;
    }

}