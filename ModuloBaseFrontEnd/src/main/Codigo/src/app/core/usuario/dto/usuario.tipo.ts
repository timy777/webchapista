import { SelectItem } from 'primeng/api';

export class UsuarioTipo {

    public static get NORMAL(): UsuarioTipo { return new UsuarioTipo(2, 'Normal'); }
    public static get ACTIVE_DIRECTORY(): UsuarioTipo { return new UsuarioTipo(3, 'Active Directory'); }

    public static get TO_LIST(): SelectItem[] {
        return [{ label: this.NORMAL.etiqueta, value: this.NORMAL.valor },
        { label: this.ACTIVE_DIRECTORY.etiqueta, value: this.ACTIVE_DIRECTORY.valor }];
    }

    valor: number;
    etiqueta: string;

    constructor(valor: number, etiqueta: string) {
        this.valor = valor;
        this.etiqueta = etiqueta;
    }

    public static obtenerPermisoTipoPorValor(valor: number): UsuarioTipo {
        if (valor === UsuarioTipo.NORMAL.valor) {
            return UsuarioTipo.NORMAL;
        }

        if (valor === UsuarioTipo.ACTIVE_DIRECTORY.valor) {
            return UsuarioTipo.ACTIVE_DIRECTORY;
        }

        return null;
    }

    tipoNormal(): boolean {
        return this.valor === UsuarioTipo.NORMAL.valor;
    }

    tipoActiveDirectory(): boolean {
        return this.valor === UsuarioTipo.ACTIVE_DIRECTORY.valor;
    }

}