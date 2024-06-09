import { SelectItem } from 'primeng/api';

export class PermisoTipo {

    public static get LECTURA(): PermisoTipo { return new PermisoTipo(1, 'Lectura'); }
    public static get LECTURA_ESCRITURA(): PermisoTipo { return new PermisoTipo(2, 'Lectura y Escritura'); }
    public static get NINGUNO(): PermisoTipo { return new PermisoTipo(3, 'Ninguno'); }

    public static get TO_LIST(): SelectItem[] {
        return [{ label: this.LECTURA.etiqueta, value: this.LECTURA.valor },
        { label: this.LECTURA_ESCRITURA.etiqueta, value: this.LECTURA_ESCRITURA.valor },
        { label: this.NINGUNO.etiqueta, value: this.NINGUNO.valor }];
    }

    valor: number;
    etiqueta: string;

    constructor(valor: number, etiqueta: string) {
        this.valor = valor;
        this.etiqueta = etiqueta;
    }

    public static obtenerPermisoTipoPorValor(valor: number): PermisoTipo {
        if (valor === PermisoTipo.LECTURA.valor) {
            return PermisoTipo.LECTURA;
        }

        if (valor === PermisoTipo.LECTURA_ESCRITURA.valor) {
            return PermisoTipo.LECTURA_ESCRITURA;
        }

        if (valor === PermisoTipo.NINGUNO.valor) {
            return PermisoTipo.NINGUNO;
        }

        return null;
    }

    tipoLectura(): boolean {
        return this.valor === PermisoTipo.LECTURA.valor;
    }

    tipoLecturaEscritura(): boolean {
        return this.valor === PermisoTipo.LECTURA_ESCRITURA.valor;
    }

    tipoNinguno(): boolean {
        return this.valor === PermisoTipo.NINGUNO.valor;
    }

}