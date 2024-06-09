import { environment } from '@env/environment';

export class CrudEstado {

    public static get VIEW(): CrudEstado { return new CrudEstado(0); }
    public static get NUEVO(): CrudEstado { return new CrudEstado(1); }
    public static get EDITAR(): CrudEstado { return new CrudEstado(2); }
    public static get ELIMINAR(): CrudEstado { return new CrudEstado(3); }
    public static get OTRO(): CrudEstado { return new CrudEstado(4); }
    public static get OTRO2(): CrudEstado { return new CrudEstado(5); }

    valor: number;

    constructor(valor: number) {
        this.valor = valor;
    }

    estadoView(): boolean {
        return this.valor === CrudEstado.VIEW.valor;
    }

    estadoNuevo(): boolean {
        return this.valor === CrudEstado.NUEVO.valor;
    }

    estadoEditar(): boolean {
        return this.valor === CrudEstado.EDITAR.valor;
    }

    estadoEliminar(): boolean {
        return this.valor === CrudEstado.ELIMINAR.valor;
    }

    estadoOtro(): boolean {
        return this.valor === CrudEstado.OTRO.valor;
    }

    estadoOtro2(): boolean {
        return this.valor === CrudEstado.OTRO2.valor;
    }

}