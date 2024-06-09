export class LoginInput {

    nombreUsuario: string;
    contrasena: string;

    constructor(nombreUsuario: string, contrasena: string) {
        this.nombreUsuario = nombreUsuario;
        this.contrasena = contrasena;
    }

}