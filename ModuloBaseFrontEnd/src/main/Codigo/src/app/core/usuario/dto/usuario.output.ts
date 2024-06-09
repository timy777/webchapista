export class UsuarioOutput {

    id: number;
    nombreUsuario: string;
    nombreCompleto: string;
    tipo: string;
    rolId: number;
    rolNombre: string;
    estado: string;

    constructor(id: number, nombreUsuario: string, nombreCompleto: string, tipo: string, rolId: number,
        rolNombre: string, estado: string) {
        this.id = id;
        this.nombreUsuario = nombreUsuario;
        this.nombreCompleto = nombreCompleto;
        this.tipo = tipo;
        this.rolId = rolId;
        this.rolNombre = rolNombre;
        this.estado = estado;
    }

    public static getInstance(): UsuarioOutput {
        return new UsuarioOutput(null, '', '', "LDAP", -1, '', '');
    }
}