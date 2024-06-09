export class ParametroOutput {

    id: string;
    nombre: string;
    tipo: number;
    valor: string;
    descripcion: string;
    tipoParametroId: number;
    tipoParametroNombre: string;
    editable: boolean;

    constructor(id: string, nombre: string, tipo: number, valor: string,
                descripcion: string, tipoParametroId: number, 
                tipoParametroNombre: string, editable: boolean) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.valor = valor;
        this.descripcion = descripcion;
        this.tipoParametroId = tipoParametroId;
        this.tipoParametroNombre = tipoParametroNombre;
        this.editable = editable;
    }

    public static getInstance(): ParametroOutput {
        return new ParametroOutput(null, '', -1, '', '', -1, '', false);
    }

}