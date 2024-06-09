import { environment } from '@env/environment';

export class PrivilegioTipo {

    public static get MODULO(): PrivilegioTipo { return new PrivilegioTipo(1); }
    public static get FORMULARIO(): PrivilegioTipo { return new PrivilegioTipo(2); }
    public static get ACCION(): PrivilegioTipo { return new PrivilegioTipo(3); }

    valor: number;

    constructor(valor: number) {
        this.valor = valor;
    }

    tipoModulo(): boolean {
        return this.valor === PrivilegioTipo.MODULO.valor;
    }

    tipoFormulario(): boolean {
        return this.valor === PrivilegioTipo.FORMULARIO.valor;
    }

    tipoAccion(): boolean {
        return this.valor === PrivilegioTipo.ACCION.valor;
    }

}