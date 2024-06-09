import { ModuloOutput } from './modulo.output';

export class LoginOutput {

    token: string;
    nombreUsuario: string;
    rolId: number;
    rol: string;
    modulos: ModuloOutput[];
    nombre: string;

    inactivityTime: string;
    timeoutBackend: string;
    urlNoTimeoutBackend: string;

    constructor(token: string, rolId: number, rol: string, modulos: ModuloOutput[], nombre: string, inactivityTime: string, timeoutBackend: string, urlNoTimeoutBackend: string) {
        this.token = token;
        this.rolId = rolId;
        this.rol = rol;
        this.modulos = modulos;
        this.nombre = nombre;
        this.inactivityTime = inactivityTime;
        this.timeoutBackend = timeoutBackend;
        this.urlNoTimeoutBackend = urlNoTimeoutBackend;
    }

}