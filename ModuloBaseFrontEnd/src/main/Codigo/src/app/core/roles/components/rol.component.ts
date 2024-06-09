import { OnInit, Component } from '@angular/core';
import { RolService } from '@app/core/roles/service/rol.service';
import { Validators, FormBuilder} from '@angular/forms';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { RolInput } from '../dto/rol.input';
import { TreeNode } from 'primeng/api';
import { PermisoService } from '../service/permiso.service';
import { ConvertUtil } from '@app/core/global/convert.util';
import { CrudEstado } from '@app/core/global/crud.estado';
import { ModuloOutput } from '@app/core/auth/login/dto/modulo.output';
import { AccionOutput } from '@app/core/auth/login/dto/accion.output';
import { PermisoInput } from '../dto/permiso.input';
import { PrivilegioTipo } from '@app/core/global/privilegio.tipo';
import { PermisoTipo } from '@app/core/global/permiso.tipo';
import { RolTipoParametroPermisoOutput } from '../dto/rol.tipo.parametro.permiso.output';
import { TipoParametroPermisoInput, RolTipoParametroPermisoInput } from '../dto/rol.tipo.parametro.permiso.input';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { Sort } from '@app/core/global/paginacion';
import { Location } from '@angular/common';
import { RolOutput } from '../dto/rol.output';
import { CrudComponentV2 } from '@app/core/global/crud.component2';
import { SideBarService } from '@app/core/sidebar/side.bar.service';
import { EncriptacionUtil } from '@app/core/global/utils/encriptacion.util';
import { Endpoints } from '@app/core/global/endpoints';
import { SessionStorageUtil } from '@app/core/global/utils/sesion.storage.util';

@Component({
  selector: "rol",
  templateUrl: "./rol.component.html",
  styleUrls: ["./rol.component.scss"],
})
export class RolComponent extends CrudComponentV2<RolInput, RolOutput, string>
  implements OnInit {

  permisosTree: TreeNode[];

  permisosSeleccionadosTree: TreeNode[];

  rolTiposParametrosPermisos: RolTipoParametroPermisoOutput[];

  colsTree: any[];

  colsTiposParametros: any[];

  items: any[];

  constructor(
    private permisoService: PermisoService,
    formBuilder: FormBuilder,
    service: RolService,
    location: Location,
    messageService: MessageService,
    sideBarService: SideBarService,
    authService: AuthService,
    confirmationService: ConfirmationService) {
    super(formBuilder, service, location, messageService, sideBarService,
      authService, confirmationService, 'rol');


    this.permisosTree = [];
    this.permisosSeleccionadosTree = [];

    this.rolTiposParametrosPermisos = [];

    this.colsTree = [];
    this.colsTiposParametros = [];
  }

  ngOnInit() {
    //sessionStorage.setItem('idtipoparametro','1');
    SessionStorageUtil.setItem('idtipoparametro','1');
    this.input.sort = new Sort("id", "desc");
    this.inicial(true);
    
  }


  getIdentificador(): string {
    return this.dto.id.toString();
  }

  getIdentificadorEncriptado(): string {
    return EncriptacionUtil.encrypt(this.dto.id.toString());
  }

  getInstance(): RolOutput {
    return RolOutput.getInstance();
  }

  getDatosCrearActualizar(): RolInput {
    return new RolInput(
      this.profileForm.value.nombre,
      this.profileForm.value.descripcion
    );
  }

  getProfileForm(data: RolOutput) {
    this.profileForm = this.formBuilder.group({
      nombre: [
        data.nombre,
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      descripcion: [
        data.descripcion,
        Validators.compose([Validators.maxLength(200)]),
      ],
    });
  }

  getColumnas(): any[] {
    //console.log(" getcolumns ")
    this.colsTree = [
      { field: "nombre", header: this.obtenerEtiqueta('crud.sub.header.modulo') }
    ];

    this.colsTiposParametros = [
      { field: "tipoParametroNombre", header: this.obtenerEtiqueta('tbl.parametro.nombre'), width: "50%" },
      { field: "tipoPermiso", header: this.obtenerEtiqueta('tbl.parametro.persmiso'), width: "50%" },
    ];

    return [
      { field: "id", header: this.obtenerEtiqueta('tbl.id'), class: "col_id", width:'3%' },
      { field: "nombre", header: this.obtenerEtiqueta('tbl.nombre'), class: "col_nombre", width:'45%' },
      { field: "descripcion", header: this.obtenerEtiqueta('tbl.descripcion'), class: "col_descripcion", width:'45%' },
    ];
  }

  establecerValoresPorDefecto() {
  }

  sortColumna(columna: string): string {
    return columna
  }

  setFiltroPorDefecto(filters: any) {
  }  
  

  camposFiltrar(filters: any): Map<string, string> {
    //console.log("**** abc ", filters);
  
    let map = new Map();
    map.set('nombre', this.campoFiltrar(filters.nombre));
    map.set('descripcion', this.campoFiltrar(filters.descripcion));

    return map;
  }

  exportColumnas(data: any[]): any[] {
    let temp: any[] = []
    data.forEach(d => {
        let registro: any = {};
        registro[this.obtenerEtiqueta('tbl.id')] = d.id
        registro[this.obtenerEtiqueta('tbl.nombre')] = d.nombre
        registro[this.obtenerEtiqueta('tbl.descripcion')] = d.descripcion
        console.log("etiquetas "+JSON.stringify(registro))
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
    /*let valor = true; 
    if (this.profileForm.valid) {
      console.log("validando OK");
      return Promise.resolve(true);
    } else {
      console.log("**** existe errorres");
      // Mostrar mensajes de error o realizar acciones cuando el formulario es inválido
    }*/
    
    if (this.profileForm.valid) {
      return Promise.resolve(true);
    }
    else{
      return false;
    }
  }

  async preCancelar(): Promise<boolean> {
    return Promise.resolve(true);
  }

  posGuardar() { }

  posActualizar() { }

  postEliminar() { }

  postCancelar() { }

  tiposPermisos() {
    return PermisoTipo.TO_LIST;
  }

  obtenerTipoPermisoNombre(valor: number) {
    return PermisoTipo.obtenerPermisoTipoPorValor(valor).etiqueta;
  }

  tipoPermisos: SelectItem[] = [];
  //rol: RolOutput;
  //roles: RolOutput[] = [];
  async permisosParametros() {
    try {
      if (this.dto === null || this.dto === undefined) {
        this.mensajeError('Seleccione un registro');
        return;
      }
      /*console.log("************ OAC");
      this.roles.push(new RolOutput(1, "abc", ""));
      this.roles.push(new RolOutput(2, "xyz", ""));
      this.roles.push(new RolOutput(3, "aaa", ""));
      this.roles.push(new RolOutput(4, "bbb", ""));*/
      this.tipoPermisos = PermisoTipo.TO_LIST;

      this.crud = CrudEstado.OTRO2;
      let rolIdEncriptado = EncriptacionUtil.encrypt(this.dto.id.toString());
      console.log("rolIdEncriptado: "+rolIdEncriptado);
      await this.permisoService
        .obtenerRolTiposParametrosPermisosPorRol(rolIdEncriptado)
        .then((datos) => {
          this.rolTiposParametrosPermisos = datos;
        })
        .catch((err) => (this.mensajeError(err)));
    } catch (ex) {
      this.crud = CrudEstado.VIEW;
      this.mensajeError(
        "Error en el procesamiento, " +
        ex['message'] +
        ", comuniquese con el administrador.");
    }
  }

  guardarPermisosParametros() {
    try {
      this.proceso = true;

      let tiposParametros: TipoParametroPermisoInput[] = [];

      this.rolTiposParametrosPermisos.forEach((permiso) => {
        tiposParametros.push(
          new TipoParametroPermisoInput(
            permiso.tipoParametroId,
            permiso.tipoPermiso
          )
        );
      });

      this.permisoService
        .guardarRolTiposParametrosPermisosPermisosPorRol(
          new RolTipoParametroPermisoInput(this.dto.id, tiposParametros)
        )
        .then((datos) => {
          this.rolTiposParametrosPermisos = [];
          this.reload()
          this.mensajeOk("Permisos de parametros actualizados");
        })
        .catch((err) => {
          this.mensajeError(err);
        })
        .finally(() => {
          this.proceso = false;
        });
    } catch (ex) {
      this.proceso = false;
      this.crud = CrudEstado.VIEW;
      this.mensajeError("Error en el procesamiento, " +
      ex['message'] +
        ", comuniquese con el administrador.");
    }
  }

  cancelarPermisosParametros() {
    this.rolTiposParametrosPermisos = [];
    this.reload()
  }

  async permisos() {
    try {
      if (this.dto === null || this.dto === undefined) {
        this.mensajeError('Seleccione un registro');
        return;
      }
      this.crud = CrudEstado.OTRO;
      let paramIdEncript = EncriptacionUtil.encrypt(this.dto.id.toString());
      console.log("paramIdEncript: " + paramIdEncript);

      await this.permisoService
        .obtenerPlantillaPermisos()
        .then(async (modulos: ModuloOutput[]) => {
          await this.permisoService
            .obtenerPermisosPorRol(paramIdEncript)
            .then((seleccionados: AccionOutput[]) => {
              this.permisosSeleccionadosTree = [];

              seleccionados.forEach((accion) => {
                this.permisosSeleccionadosTree.push({
                  data: accion,
                  selectable: false,
                  expanded: true,
                  children: [],
                });
              });

              this.permisosTree = ConvertUtil.moduloToTree(
                modulos,
                this.permisosSeleccionadosTree
              );
            })
            .catch((err) => (this.mensajeError(err)));
        })
        .catch((err) => (this.mensajeError(err)));
    } catch (ex) {
      this.crud = CrudEstado.VIEW;
      this.mensajeError("Error en el procesamiento, " +
      ex['message'] +
        ", comuniquese con el administrador.");
    }
  }

  guardarPermisos() {
    try {
      this.proceso = true;

      let acciones: number[] = [];

      this.permisosSeleccionadosTree.forEach((permiso) => {
        if (permiso.data.tipo === PrivilegioTipo.ACCION.valor) {
          acciones.push(permiso.data.id);
        }
      });

      this.permisoService
        .guardarPermisosPorRol(new PermisoInput(this.dto.id, acciones))
        .then((datos) => {
          this.permisosTree = [];
          this.permisosSeleccionadosTree = [];
          this.reload()
          this.mensajeOk("Permisos actualizados");
        })
        .catch((err) => {
          this.mensajeError(err);
        })
        .finally(() => {
          this.proceso = false;
        });
    } catch (ex) {
      this.proceso = false;
      this.crud = CrudEstado.VIEW;
      this.mensajeError("Error en el procesamiento, " +
      ex['message'] +
        ", comuniquese con el administrador.");
    }
  }

  cancelarPermisos() {
    this.permisosTree = [];
    this.permisosSeleccionadosTree = [];
    this.reload()
  }

  hasPermissionAccion(nombreAccion: string): boolean {
    this.hasPermission(Endpoints.FORM_ROL);
    return this.permisosVista.includes(nombreAccion);
  }

}


