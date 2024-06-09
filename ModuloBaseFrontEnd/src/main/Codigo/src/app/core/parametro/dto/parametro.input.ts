export class ParametroInput {

    nombre: string;
    tipo: number;
    valor: string;
    descripcion: string;
    tipoParametroId: number;

    constructor(nombre: string, tipo: number, valor: string,
                descripcion: string, tipoParametroId: number) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.valor = valor;
        this.descripcion = descripcion;
        this.tipoParametroId = tipoParametroId;
    }

}