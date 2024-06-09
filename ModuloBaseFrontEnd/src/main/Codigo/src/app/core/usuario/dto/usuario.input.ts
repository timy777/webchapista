export class UsuarioInput {

    nombreUsuario: string;
    rolId: number;
    tipo: number;


    constructor(nombreUsuario: string, rolId: number, tipo: number) {
        this.nombreUsuario = nombreUsuario;
        this.rolId = rolId;
        this.tipo = tipo;
 
    }

}