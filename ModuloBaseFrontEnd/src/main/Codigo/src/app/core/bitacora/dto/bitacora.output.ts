export class BitacoraOutput {

    id: number;
    accion: string;
    direccionIp: string;
    fecha: string;
    formulario: string;
    usuario: string;
    valorAnterior: string;
    valorNuevo: string;
    logSistemaId: number;

    constructor(id: number, accion: string, direccionIp: string, fecha: string,
        formulario: string, usuario: string, valorAnterior: string, valorNuevo: string, logSistemaId: number) {
        this.id = id;
        this.accion = accion;
        this.direccionIp = direccionIp;
        this.fecha = fecha;
        this.formulario = formulario;
        this.usuario = usuario;
        this.valorAnterior = valorAnterior;
        this.valorNuevo = valorNuevo;
        this.logSistemaId = logSistemaId;
    }

    public static getInstance(): BitacoraOutput {
        return new BitacoraOutput(null, '', '', '', '', '', '', '', null);
    }
}