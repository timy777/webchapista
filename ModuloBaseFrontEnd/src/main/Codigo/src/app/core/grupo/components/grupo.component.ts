import { OnInit, Component } from '@angular/core';
import { RolOutput } from '@app/core/roles/dto/rol.output';
import { RolService } from '@app/core/roles/service/rol.service';
import { Validators, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { GrupoOutput } from '../dto/grupo.output';
import { GrupoInput } from '../dto/grupo.input';
import { GrupoService } from '../service/grupo.service';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { Sort, Paginacion } from '@app/core/global/paginacion';
import { Location} from '@angular/common';
import { CrudComponentV2 } from '@app/core/global/crud.component2';
import { SideBarService } from '@app/core/sidebar/side.bar.service';
import { EncriptacionUtil } from '@app/core/global/utils/encriptacion.util';
import { Endpoints } from '@app/core/global/endpoints';
import { SessionStorageUtil } from '@app/core/global/utils/sesion.storage.util';

@Component({
  selector: 'grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent extends CrudComponentV2<GrupoInput, GrupoOutput, string> implements OnInit {

  roles: RolOutput[];
  rolesSeleccionadble: SelectItem[];
  items: any[];

  constructor(
    private rolService: RolService,
    formBuilder: FormBuilder,
    service: GrupoService,
    location: Location,
    messageService: MessageService,
    sideBarService: SideBarService,
    authService: AuthService,
    confirmationService: ConfirmationService) {
    super(formBuilder, service, location, messageService, sideBarService,
      authService, confirmationService, 'grupo');
    this.roles = [];
  }

  ngOnInit() {
    //sessionStorage.setItem('idtipoparametro','1');
    SessionStorageUtil.setItem('idtipoparametro', '1');
    this.rolesSeleccionadble = [];
    this.rolesSeleccionadble.push({ label: 'Todos', value: null })
    this.rolService.listar(new Map(), new Paginacion(2000, 0, new Sort('nombre', 'asc'))).
      then(data => {
        data.content.forEach(r => {
          this.rolesSeleccionadble.push({ label: r.nombre, value: r.nombre })
        })
      }).
      catch(err => { this.mensajeError(err); });
    this.input.sort = new Sort('id', 'desc');
    this.inicial(true);
  }

  getIdentificador(): string {
    return this.dto.id.toString();
  }

  getIdentificadorEncriptado(): string {
    return EncriptacionUtil.encrypt(this.dto.id.toString());
  }

  getInstance(): GrupoOutput {
    return GrupoOutput.getInstance();
  }

  getDatosCrearActualizar(): GrupoInput {
    const rolIdTemp = (this.profileForm.value.rolId === null || this.profileForm.value.rolId === undefined) ? null : this.profileForm.value.rolId.id;
    return new GrupoInput(this.profileForm.value.nombre,
      this.profileForm.value.descripcion, rolIdTemp);
  }

  getProfileForm(data: GrupoOutput) {
    this.profileForm = this.formBuilder.group({
      nombre: [data.nombre, Validators.compose([Validators.required, Validators.maxLength(255)])],
      descripcion: [data.descripcion, Validators.compose([Validators.maxLength(255)])],
      rolId: [this.roles.find(rol => rol.id === data.rolId), Validators.required]
    });
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

  getColumnas(): any[] {
    return [
      { field: 'nombre', header: this.obtenerEtiqueta('tbl.nombre'), class: 'col_nombre', width:'40%' },
      { field: 'descripcion', header: this.obtenerEtiqueta('tbl.descripcion'), class: 'col_descripcion', width:'40%' },
      { field: 'rolNombre', header: this.obtenerEtiqueta('tbl.rol'), class: 'col_rol', width:'20%' }
    ]
  }

  establecerValoresPorDefecto() {
  }

  sortColumna(columna: string): string {
    if (columna === 'nombre') {
      return 'g.nombre'
    }

    if (columna === 'descripcion') {
      return 'g.descripcion'
    }

    if (columna === 'rolNombre') {
      return 'r.nombre'
    }

    return columna
  }

  setFiltroPorDefecto(filters: any) {
  }

  camposFiltrar(filters: any): Map<string, string> {
    let map = new Map();

    map.set('nombre', this.campoFiltrar(filters.nombre));
    map.set('descripcion', this.campoFiltrar(filters.descripcion));
    map.set('rolNombre', this.campoFiltrar(filters.rolNombre));

    return map;
  }

  exportColumnas(data: any[]): any[] {
    let temp: any[] = []
    data.forEach(d => {
      let registro: any = {};
      registro[this.obtenerEtiqueta('tbl.nombre')] = d.nombre
      registro[this.obtenerEtiqueta('tbl.descripcion')] = d.descripcion
      registro[this.obtenerEtiqueta('tbl.rol')] = d.rolNombre
      temp.push(registro)
    })

    return temp
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
    this.hasPermission(Endpoints.FORM_GRUPO);
    return this.permisosVista.includes(nombreAccion);
  }

}