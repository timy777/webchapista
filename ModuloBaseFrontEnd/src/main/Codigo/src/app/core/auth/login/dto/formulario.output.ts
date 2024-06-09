import { AccionOutput } from './accion.output';

export class FormularioOutput {

    id: number;
    nombre: string;
    orden: number;
    tipo: number;
    url: string;
    icono: string;
    acciones: AccionOutput[];

    constructor(id: number, nombre: string, orden: number, tipo: number, url: string, icono: string, acciones: AccionOutput[]) {
        this.id = id;
        this.nombre = nombre;
        this.orden = orden;
        this.tipo = tipo;
        this.url = url;
        this.icono = icono;
        this.acciones = acciones;
    }

}