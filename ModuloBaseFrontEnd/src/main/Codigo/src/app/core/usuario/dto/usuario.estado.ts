import { SelectItem } from 'primeng/api';

export class UsuarioEstado {

    public static get HABILITADO(): UsuarioEstado { return new UsuarioEstado(1, 'Habilitado'); }
    public static get INHABILITADO(): UsuarioEstado { return new UsuarioEstado(2, 'Inhabilitado'); }
    public static get BLOQUEADO(): UsuarioEstado { return new UsuarioEstado(2, 'Bloqueado'); }

    public static get TO_LIST(): SelectItem[] {
        return [{ label: this.HABILITADO.etiqueta, value: this.HABILITADO.valor },
            { label: this.INHABILITADO.etiqueta, value: this.INHABILITADO.valor },
            { label: this.BLOQUEADO.etiqueta, value: this.BLOQUEADO.valor }];
    }

    valor: number;
    etiqueta: string;

    constructor(valor: number, etiqueta: string) {
        this.valor = valor;
        this.etiqueta = etiqueta;
    }

}