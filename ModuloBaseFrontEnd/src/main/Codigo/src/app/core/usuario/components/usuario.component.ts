import { OnInit, Component } from '@angular/core';
import { UsuarioOutput } from '../dto/usuario.output';
import { UsuarioService } from '../service/usuario.service';
import { RolOutput } from '@app/core/roles/dto/rol.output';
import { RolService } from '@app/core/roles/service/rol.service';
import { Validators, FormBuilder } from '@angular/forms';
import { UsuarioInput } from '../dto/usuario.input';
import { ConfirmationService, SelectItem, MessageService} from 'primeng/api';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { Sort, Paginacion } from '@app/core/global/paginacion';
//import { EtiquetaService } from '@app/core/etiqueta/service/etiqueta.service';
import { Location } from '@angular/common';
import { CrudComponentV2 } from '@app/core/global/crud.component2';
import { SideBarService } from '@app/core/sidebar/side.bar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '@app/core/modal/service/modal.component.service';
import { EncriptacionUtil } from '@app/core/global/utils/encriptacion.util';
import { Endpoints } from '@app/core/global/endpoints';
import { SessionStorageUtil } from '@app/core/global/utils/sesion.storage.util';

@Component({
    selector: 'usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent extends CrudComponentV2<UsuarioInput, UsuarioOutput, string> implements OnInit {

    roles: RolOutput[];
    check: boolean = true;

    rolesFilter: SelectItem[];

    seleccionDefaultTipo: string;
    tipos: SelectItem[];

    estados: SelectItem[];

    usuarioLdap: number = 3
    usuarioLocal: number = 2
    usuarioLdapValor: string = "LDAP";
    usuarioLocalValor: string = "LOCAL"
    usuarioHabilitado: string = "Habilitado"

    items: any[];

    constructor(
        private rolService: RolService,
        formBuilder: FormBuilder,
        service: UsuarioService,
        location: Location,
        messageService: MessageService,
        sideBarService: SideBarService,
        authService: AuthService,
        confirmationService: ConfirmationService,
        //etiquetaService: EtiquetaService,
        private modalService : ModalService,
        private ngModal: NgbModal) {
        super(formBuilder, service, location, messageService, sideBarService,
            authService, confirmationService, 'usuario');
    }
  
    ngOnInit() {
      //sessionStorage.setItem('idtipoparametro','1');
      SessionStorageUtil.setItem('idtipoparametro','1');
        this.rolesFilter = [];
        this.rolesFilter.push({ label: 'Todos', value: null })
        this.rolService.listar(new Map(), new Paginacion(2000, 0, new Sort('nombre', 'asc'))).
            then(data => {
                data.content.forEach(r => {
                    this.rolesFilter.push({ label: r.nombre, value: r.nombre })
                })
            }).
            catch(err => { this.mensajeError(err); });
        this.seleccionDefaultTipo = 'LDAP';
        this.tipos = [{ label: 'Todos', value: null }, { label: 'Ldap', value: 'LDAP' }, { label: 'Local', value: 'LOCAL' }]
        this.estados = [{ label: 'Todos', value: null }, { label: 'Habilitado', value: 'Habilitado' }, { label: 'Inhabilitado', value: 'Inhabilitado' }, { label: 'Bloqueado', value: 'Bloqueado' }]
        this.input.sort = new Sort('id', 'desc');
        this.inicial(true);
    }

    getIdentificador(): string {
        return this.dto.id.toString();
    }

    getIdentificadorEncriptado(): string {
        return EncriptacionUtil.encrypt(this.dto.id.toString());
    }


    getInstance(): UsuarioOutput {
        return UsuarioOutput.getInstance();
    }

    getDatosCrearActualizar(): UsuarioInput {
        return new UsuarioInput(this.profileForm.value.nombreUsuario,
            (this.profileForm.value.rolId === null || this.profileForm.value.rolId === undefined ? null : this.profileForm.value.rolId.id),
            this.usuarioLdap);
           // this.usuarioLocal);
    }

    getProfileForm(data: UsuarioOutput) {
        this.profileForm = this.formBuilder.group({
            nombreUsuario: [data.nombreUsuario, Validators.compose([Validators.required, Validators.maxLength(50)])],
              rolId: [this.roles.find(rol => rol.id === data.rolId), Validators.required]
        });
    }

    getColumnas(): any[] {
        return [
            { field: 'id', header: this.obtenerEtiqueta('tbl.id'), class: 'col_id', width:'10%' },
            { field: 'nombreUsuario', header: this.obtenerEtiqueta('tbl.usuario'), class: 'col_nombre_usuario', width:'30%' },
            { field: 'nombreCompleto', header: this.obtenerEtiqueta('tbl.nombre.completo'), class: 'col_nombre_completo', width:'30%' },
            { field: 'rolNombre', header: this.obtenerEtiqueta('tbl.rol'), class: 'col_rol_nombre', width:'15%' },
            { field: 'estado', header: this.obtenerEtiqueta('tbl.estado'), class: 'col_estado', width:'15%' }
        ]
    }

    establecerValoresPorDefecto() {
    }

    sortColumna(columna: string): string {
        if (columna === 'nombreCompleto') {
            return 'nombre_completo'
        }

        if (columna === 'nombreUsuario') {
            return 'nombre_usuario'
        }

        if (columna === 'rolNombre') {
            return 'r.nombre'
        }

        return columna
    }

    setFiltroPorDefecto(filters: any) {
        //  filters.tipo = { value: this.seleccionDefaultTipo, matchMode: 'equals' }
    }

    camposFiltrar(filters: any): Map<string, string> {
        let map = new Map();

        map.set('id', this.campoFiltrar(filters.id));
        map.set('nombreCompleto', this.campoFiltrar(filters.nombreCompleto));
        map.set('nombreUsuario', this.campoFiltrar(filters.nombreUsuario));
        map.set('rolNombre', this.campoFiltrar(filters.rolNombre));
        map.set('tipo', this.campoFiltrar(filters.tipo));
        map.set('estado', this.campoFiltrar(filters.estado));

        return map;
    }

    exportColumnas(data: any[]): any[] {
        let temp: any[] = []
        data.forEach(d => {
            let registro: any = {};
            registro[this.obtenerEtiqueta('tbl.id')] = d.id
            registro[this.obtenerEtiqueta('tbl.usuario')] = d.nombreUsuario
            registro[this.obtenerEtiqueta('tbl.nombre.completo')] = d.nombreCompleto
            registro[this.obtenerEtiqueta('tbl.rol')] = d.rolNombre
            registro[this.obtenerEtiqueta('tbl.estado')] = d.estado
            temp.push(registro)
        })

        return temp
    }

    async preNuevo(): Promise<boolean> {
        return await this.rolService.listar(new Map(), new Paginacion(2000, 0, new Sort('nombre', 'asc'))).
            then(roles => {
                this.roles = roles.content;
                return true;
            }).
            catch(err => {
                this.mensajeError(err);
                return false;
            });
    }

    async preEditar(): Promise<boolean> {
        return await this.rolService.listar(new Map(), new Paginacion(2000, 0, new Sort('nombre', 'asc'))).
            then(roles => {
                this.roles = roles.content;
                return true;
            }).
            catch(err => {
                this.mensajeError(err);
                return false;
            });
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

    public habilitarUsuario() {
        if (this.dto === null) {
            this.mensajeError('Seleccione un registro');
            return;
        }

        let nombreUsuario = this.dto.nombreUsuario;
        (this.service as UsuarioService).habilitarUsuario(this.dto.id).
            then(() => {
                this.reload()
                this.mensajeOk("Se habilito correctamente al usuario : " + nombreUsuario)
            }).
            catch(err => this.mensajeError(err)).
            finally(() => {
                this.proceso = false;
            });
    }

    public inhabilitarUsuario() {
        if (this.dto === null) {
            this.mensajeError('Seleccione un registro');
            return;
        }
        this.proceso = true;
        let nombreUsuario = this.dto.nombreUsuario;
        (this.service as UsuarioService).inhabilitarUsuario(this.dto.id).
            then(() => {
                this.reload()
                this.mensajeOk("Inhabilito correctamente al usuario : " + nombreUsuario);
            }).
            catch(err => this.mensajeError(err)).
            finally(() => {
                this.proceso = false;
            });
    }

    reseteoRow(rowData) {
        this.dto = rowData;
    }

    hasPermissionAccion(nombreAccion: string): boolean {
        this.hasPermission(Endpoints.FORM_USUARIO);
        return this.permisosVista.includes(nombreAccion);
    }

}