import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { Location } from '@angular/common';
//import { EtiquetaService } from '../etiqueta/service/etiqueta.service';
import { Global } from './constants';
import * as moment from 'moment';
import { SideBarService } from '@app/core/sidebar/side.bar.service';
import { SessionStorageUtil } from './utils/sesion.storage.util';
//import { ConsoleReporter } from 'jasmine';


export class ComponenteGenerico {

    public grupoEtiqueta: string;
    public etiquetas: Map<string, string> = new Map<string, string>();

    public es: any;

    public proceso: boolean;

    //para el sub nav  
    subNavBar: boolean = false;

    permisosVista: string;

    constructor(
        public location: Location,
        public messageService: MessageService,
        public sideBarService: SideBarService,
        public authService: AuthService,
        public confirmationService: ConfirmationService,
        grupoEtiqueta: string) {

        this.etiquetas = new Map<string, string>();

        this.cargarEtiquetasv2('plantilla');
        //this.cargarEtiquetas(grupoEtiqueta);
        this.cargarEtiquetasv2(grupoEtiqueta);

        this.grupoEtiqueta = grupoEtiqueta;

        this.es = Global.obtenerCalendarEspanol();

        this.sideBarService.change.subscribe(isOpen => {
            this.subNavBar = isOpen;
        });

        this.subNavBar = false;
    }

    mensajeOk(detalle: string, sumario?: string) {
        const temp = (sumario === null || sumario === undefined) ? 'Proceso exitoso' : sumario
        this.messageService.add({ severity: 'success', summary: temp, detail: detalle });
    }

    mensajeInformacion(detalle: string, sumario?: string) {
        const temp = (sumario === null || sumario === undefined) ? 'Informacion' : sumario
        this.messageService.add({ severity: 'info', summary: temp, detail: detalle });
    }

    mensajeAlerta(detalle: string, sumario?: string) {
        const temp = (sumario === null || sumario === undefined) ? 'Alerta' : sumario
        this.messageService.add({ severity: 'warn', summary: temp, detail: detalle });
    }

    mensajeError(detalle: string, sumario?: string) {
        const temp = (sumario === null || sumario === undefined) ? 'Error' : sumario
        this.messageService.add({ severity: 'error', summary: temp, detail: detalle });
    }

    /*public cargarEtiquetas(grupo: string) {
        this.etiquetaService.obtenerPorGrupo(grupo).then(data => {
            data.forEach(etiqueta => {
                this.etiquetas.set(etiqueta.llave, etiqueta.valor);
            });
        }).catch(err => {
            this.mensajeError(err);
        });
    }*/

    public cargarEtiquetasv2(grupo: string) {
        //console.log("Cargar Etiquetas V2 ", grupo);
        // console.log("Cargar Etiquetas V2 "+ grupo + " sesion: "+sessionStorage.getItem(grupo));        
        let jsonObject =  JSON.parse(SessionStorageUtil.getItemDencryt(grupo));        
        for (var value in jsonObject) {
            this.etiquetas.set(value,jsonObject[value])
        }        
    }

    public esAdministrador(): boolean {
        return this.authService.currentUserValue.rol === 'Administrador';
    }



    hasPermission(urlForm: string) {
        this.permisosVista = this.authService.getPermissionView(urlForm);
    }


    obtenerEtiqueta(key: string): string {
        const valor = this.etiquetas.get(key);

        if (valor === null || valor === undefined) {
            let keys = key.split('.');
            return keys.length == 2 ? keys[1] : key;
        }

        return valor;
    }

    campoFiltrar(campo: any): string {
        return ((campo === null || campo === undefined) ? '' : campo.value);
    }

    obtenerFecha(fecha: string): Date {
        if (fecha === null || fecha === undefined || fecha.trim().length === 0) {
            return new Date();
        }

        return moment(fecha, 'DD/MM/YYYY hh:mm:ss').toDate();
    }

}