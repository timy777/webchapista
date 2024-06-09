import { OnInit, Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { EtiquetaOutput } from '../dto/etiqueta.output';
import { EtiquetaInput } from '../dto/etiqueta.input';
import { EtiquetaService } from '../service/etiqueta.service';
import { Sort } from '@app/core/global/paginacion';
import { Location} from '@angular/common';
import { CrudComponentV2 } from '@app/core/global/crud.component2';
import { SideBarService } from '@app/core/sidebar/side.bar.service';
import { EncriptacionUtil } from '@app/core/global/utils/encriptacion.util';
import { Endpoints } from '@app/core/global/endpoints';
import { SessionStorageUtil } from '@app/core/global/utils/sesion.storage.util';

@Component({
    selector: 'etiqueta',
    templateUrl: './etiqueta.component.html',
    styleUrls: ['./etiqueta.component.scss']
})
export class EtiquetaComponent extends CrudComponentV2<EtiquetaInput, EtiquetaOutput, string> implements OnInit {
    items: any[];
    
    constructor(
        formBuilder: FormBuilder,
        service: EtiquetaService,
        location: Location,
        messageService: MessageService,
        sideBarService: SideBarService,
        authService: AuthService,
        confirmationService: ConfirmationService) {
        super(formBuilder, service, location, messageService, sideBarService,
            authService, confirmationService, 'etiqueta');
    }
  
    ngOnInit() {
        this.input.sort = new Sort('llave', 'asc');
        //sessionStorage.setItem('idtipoparametro','1');
        SessionStorageUtil.setItem('idtipoparametro', '1');

        this.inicial(true);
    }

    getIdentificador(): string {
        return this.dto.id.toString();
    }

    getIdentificadorEncriptado(): string {
        return EncriptacionUtil.encrypt(this.dto.id.toString());
    }

    getInstance(): EtiquetaOutput {
        return EtiquetaOutput.getInstance();
    }

    getDatosCrearActualizar(): EtiquetaInput {
        return new EtiquetaInput(this.profileForm.value.valor);
    }

    getProfileForm(data: EtiquetaOutput) {
        this.profileForm = this.formBuilder.group({
            llave: [data.llave],
            valor: [data.valor, Validators.compose([Validators.maxLength(255)])],
            grupo: [data.grupo]
        });
    }

    getColumnas(): any[] {
        return [
            { field: 'llave', header: this.obtenerEtiqueta('tbl.llave'), class: 'col_llave', width:'20%' },
            { field: 'valor', header: this.obtenerEtiqueta('tbl.valor'), class: 'col_valor', width:'40%' },
            { field: 'grupo', header: this.obtenerEtiqueta('tbl.grupo'), class: 'col_grupo', width:'20%' }
        ]
    }

    establecerValoresPorDefecto() {
    }

    sortColumna(columna: string): string {
        if (columna === 'llave') {
            return 'llave'
        }

        if (columna === 'valor') {
            return 'valor'
        }

        if (columna === 'grupo') {
            return 'grupo'
        }

        return columna
    }

    setFiltroPorDefecto(filters: any) {
    }

    camposFiltrar(filters: any): Map<string, string> {
        let map = new Map();

        map.set('llave', this.campoFiltrar(filters.llave));
        map.set('valor', this.campoFiltrar(filters.valor));
        map.set('grupo', this.campoFiltrar(filters.grupo));

        return map;
    }

    exportColumnas(data: any[]): any[] {
        let temp: any[] = []
        data.forEach(d => {
            let registro: any = {};
            registro[this.obtenerEtiqueta('tbl.llave')] = d.llave
            registro[this.obtenerEtiqueta('tbl.valor')] = d.valor
            registro[this.obtenerEtiqueta('tbl.grupo')] = d.grupo
            temp.push(registro)
        })

        return temp
    }

    async preNuevo(): Promise<boolean> {
        return Promise.resolve(true);
    }

    async preEditar(): Promise<boolean> {
        return Promise.resolve(true);
    }

    async preEliminar(): Promise<boolean> {
        return Promise.resolve(true);
    }

    async preValidacion(): Promise<boolean> {
        return Promise.resolve(true);
    }

    async preCancelar(): Promise<boolean> {
        return Promise.resolve(true);
    }

    posGuardar() {
    }

    posActualizar() {
    }

    postEliminar() {
    }

    postCancelar() {

    }
    hasPermissionAccion(nombreAccion: string): boolean {
        this.hasPermission(Endpoints.FORM_ETIQUETA);
        return this.permisosVista.includes(nombreAccion);
    }

}