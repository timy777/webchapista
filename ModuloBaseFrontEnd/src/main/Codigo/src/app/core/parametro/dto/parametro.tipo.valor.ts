export class ParametroTipoValor {

    public static get CADENA(): ParametroTipoValor { return new ParametroTipoValor(1, 'Cadena'); }
    public static get FECHA(): ParametroTipoValor { return new ParametroTipoValor(2, 'Fecha'); }
    public static get NUMERICO(): ParametroTipoValor { return new ParametroTipoValor(3, 'Numerico'); }
    public static get BOOLEANO(): ParametroTipoValor { return new ParametroTipoValor(4, 'Booleano'); }
    public static get COLOR(): ParametroTipoValor { return new ParametroTipoValor(5, 'Color'); }
    public static get LISTADO_VALORES_TEXTO(): ParametroTipoValor { return new ParametroTipoValor(6, 'Lista de cadenas'); }
    public static get LISTADO_VALORES_NUMERICOS(): ParametroTipoValor { return new ParametroTipoValor(7, 'Lista de numeros'); }
    public static get CRONTAB(): ParametroTipoValor { return new ParametroTipoValor(8, 'contab'); }
    public static get PASSWORD(): ParametroTipoValor { return new ParametroTipoValor(9, 'password'); }

    tipo: number;
    nombre: string;

    constructor(tipo: number, nombre: string) {
        this.tipo = tipo;
        this.nombre = nombre;
    }

    public static get TIPOS_VALORES(): ParametroTipoValor[] { return [this.CADENA, this.FECHA, this.NUMERICO,
         this.BOOLEANO, this.COLOR, this.LISTADO_VALORES_NUMERICOS, this.LISTADO_VALORES_TEXTO,this.CRONTAB,this.PASSWORD]; }


    public static esCadenaLista(tipo: number): boolean {
        return tipo === this.CADENA.tipo || tipo === this.LISTADO_VALORES_TEXTO.tipo || tipo === this.LISTADO_VALORES_NUMERICOS.tipo;

    }

    public static esDate(tipo: number): boolean {
        return tipo === this.FECHA.tipo;
    }

    public static esNumber(tipo: number): boolean {
        return tipo === this.NUMERICO.tipo;
    }

    public static esBool(tipo: number): boolean {
        return tipo === this.BOOLEANO.tipo;
    }

    public static esColor(tipo: number): boolean {
        return tipo === this.COLOR.tipo;
    }
    
    public static esConTab(tipo: number): boolean {
        return tipo === this.CRONTAB.tipo;
    }    

    public static esPassword(tipo: number): boolean {
        console.log("esPassword: "+ tipo)
        return tipo === this.PASSWORD.tipo;
    }
}