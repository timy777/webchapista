export class EtiquetaOutput {

    id: number;
    llave: string;
    valor: string;
    grupo: string;

    constructor(id: number, llave: string, valor: string, grupo: string) {
        this.id = id;
        this.llave = llave;
        this.valor = valor;
        this.grupo = grupo;
    }

    public static getInstance(): EtiquetaOutput {
        return new EtiquetaOutput(null, '', '', '');
    }
}
