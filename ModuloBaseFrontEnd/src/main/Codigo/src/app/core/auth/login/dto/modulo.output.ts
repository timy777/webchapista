import { FormularioOutput } from './formulario.output';

export class ModuloOutput {

    id: number;
    nombre: string;
    orden: number;
    tipo: number;
    url: string;
    icono: string;
    formularios: FormularioOutput[];

    constructor(id: number, nombre: string, orden: number, tipo: number, url: string, icono: string, formularios: FormularioOutput[]) {
        this.id = id;
        this.nombre = nombre;
        this.orden = orden;
        this.tipo = tipo;
        this.url = url;
        this.icono = icono;
        this.formularios = formularios;
    }

}