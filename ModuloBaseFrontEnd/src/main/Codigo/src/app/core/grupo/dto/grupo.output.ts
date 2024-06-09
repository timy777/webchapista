export class GrupoOutput {

    id: number;
    nombre: string;
    descripcion: string;
    rolId: number;
    rolNombre: string;

    constructor(id: number, nombre: string, descripcion: string, rolId: number, rolNombre: string) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.rolId = rolId;
        this.rolNombre = rolNombre;
    }

    public static getInstance(): GrupoOutput {
        return new GrupoOutput(null, '', '', -1, '');
    }
}