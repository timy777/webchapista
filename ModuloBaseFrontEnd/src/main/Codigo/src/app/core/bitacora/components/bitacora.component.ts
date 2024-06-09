import { LazyLoadEvent, ConfirmationService, MessageService, SelectItem } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { BitacoraOutput } from "../dto/bitacora.output";
import { BitacoraService } from "../service/bitacora.service";
import { Sort, Paginacion } from "@app/core/global/paginacion";
import { Table } from "primeng/table";
import { CrudEstado } from "@app/core/global/crud.estado";
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { Location, DatePipe } from '@angular/common';
import { SideBarService } from '@app/core/sidebar/side.bar.service';
import { ComponenteListar } from '@app/core/global/componente.listar';
import { UsuarioService } from '@app/core/usuario/service/usuario.service';
import { ParametroService } from '@app/core/parametro/service/parametro.service';
import { ParametroNombre } from '@app/core/parametro/dto/parametro.nombre';
import { EncriptacionUtil } from "@app/core/global/utils/encriptacion.util";
import { Endpoints } from "@app/core/global/endpoints";
import { SessionStorageUtil } from "@app/core/global/utils/sesion.storage.util";


@Component({
  selector: "bitacora",
  templateUrl: "./bitacora.component.html",
  styleUrls: ["./bitacora.component.scss"],
})
export class BitacoraComponent extends ComponenteListar<any, BitacoraOutput, number> implements OnInit {

  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  fechaMinima: Date;
  fechaActual: Date;

  accionesFilter: SelectItem[];
  formulariosFilter: SelectItem[];
  usuariosFilter: SelectItem[];
  items: any[];

  constructor(
    private datepipe: DatePipe,
    private usuarioService: UsuarioService,
    private parametroService: ParametroService,
    service: BitacoraService,
    location: Location,
    messageService: MessageService,
    sideBarService: SideBarService,
    authService: AuthService,
    confirmationService: ConfirmationService) {
    super(service, location, messageService, sideBarService, authService,
      confirmationService, 'bitacora');
  }

  ngOnInit() {
    //sessionStorage.setItem('idtipoparametro', '1');
    SessionStorageUtil.setItem('idtipoparametro', '1');

    this.fechaActual = new Date();
    this.fechaMinima = new Date('2024-01-01');

    /*this.fechaMinima = new Date();
    this.fechaMinima.setDate((new Date()).getDate() - 3000);
    let paramIdEncript = EncriptacionUtil.encriptarBase64(ParametroNombre.BITACORA_LOG_SISTEMA_DIAS_ATRAS.toString());
    console.log("paramIdEncript: " + paramIdEncript);
    this.parametroService.obtener(paramIdEncript).
      then(data => {
        this.fechaMinima.setDate((new Date()).getDate() - Number(data.valor));
      });*/

    this.accionesFilter = [];
    this.accionesFilter.push({ label: 'Todos', value: null })

    this.formulariosFilter = [];
    this.formulariosFilter.push({ label: 'Todos', value: null })

    this.usuariosFilter = [];
    this.usuariosFilter.push({ label: 'Todos', value: null })

    this.usuarioService.listar(new Map(), new Paginacion(2000, 0, new Sort('nombre_completo', 'asc'))).
      then(data => {
        data.content.forEach(r => {
          this.usuariosFilter.push({ label: r.nombreUsuario, value: r.nombreUsuario })
        })
      }).
      catch(err => { this.mensajeError(err); });

    this.input.sort = new Sort('id', 'desc');

    this.inicial(true);

    this.items = [
      { label: this.obtenerEtiqueta('Visualizar'), command: (event => this.verDatalle()) }
    ];
  }

  getColumnas(): any[] {
    return [
      { field: "fecha", header: this.obtenerEtiqueta('tbl.fecha'), class: 'col_fecha', width:'20%' },
      { field: 'accion', header: this.obtenerEtiqueta('tbl.accion'), class: 'col_accion', width:'15%' },
      { field: 'formulario', header: this.obtenerEtiqueta('tbl.formulario'), class: 'col_formulario', width:'30%' },
      { field: 'usuario', header: this.obtenerEtiqueta('tbl.usuario'), class: 'col_usuario', width:'20%' },
      { field: 'direccionIp', header: this.obtenerEtiqueta('tbl.direccion.ip'), class: 'col_iddireccion_ip', width:'15%' }
    ];
  }

  establecerValoresPorDefecto() {
  }

  sortColumna(columna: string): string {
    if (columna === 'direccionIp') {
      return 'direccion_ip'
    }

    return columna
  }

  setFiltroPorDefecto(filters: any) {
  }

  camposFiltrar(filters: any): Map<string, string> {
    let map = new Map();

    /*map.set('fechaIniStr', (this.fechaInicio === null) ? '' : EncriptacionUtil.encriptarBase64(this.datepipe.transform(this.fechaInicio, 'dd/MM/yyyy HH:mm:ss')));
    map.set('fechaFinStr', (this.fechaFin === null) ? '' : EncriptacionUtil.encriptarBase64(this.datepipe.transform(this.fechaFin, 'dd/MM/yyyy HH:mm:ss')));*/
    map.set('fechaIniStr', (this.fechaInicio === null) ? '' : EncriptacionUtil.encrypt(this.datepipe.transform(this.fechaInicio, 'yyyy-MM-dd')));
    map.set('fechaFinStr', (this.fechaFin === null) ? '' : EncriptacionUtil.encrypt(this.datepipe.transform(this.fechaFin, 'yyyy-MM-dd')));
    map.set('fecha', this.campoFiltrar(filters.fecha));
    map.set('accion', this.campoFiltrar(filters.accion));
    map.set('formulario', this.campoFiltrar(filters.formulario));
    map.set('usuario', this.campoFiltrar(filters.usuario));
    map.set('direccionIp', this.campoFiltrar(filters.direccionIp));

    return map;
  }

  exportColumnas(data: any[]): any[] {
    let temp: any[] = []
    data.forEach(d => {
      let registro: any = {};
      registro[this.obtenerEtiqueta('tbl.fecha')] = d.fecha
      registro[this.obtenerEtiqueta('tbl.accion')] = d.accion
      registro[this.obtenerEtiqueta('tbl.formulario')] = d.formulario
      registro[this.obtenerEtiqueta('tbl.usuario')] = d.usaurio
      registro[this.obtenerEtiqueta('tbl.direccion.ip')] = d.direccionIp
      registro[this.obtenerEtiqueta('tbl.valor.nuevo')] = d.valorNuevo
      registro[this.obtenerEtiqueta('tbl.valor.anterior')] = d.valorAntiguo
      registro[this.obtenerEtiqueta('tbl.log.sistema.id')] = d.logSistemaId
      temp.push(registro)
    })

    return temp
  }

  verDatalle() {
    if (this.dto === null || this.dto === undefined) {
      this.mensajeError('Seleccione un registro');
      return;
    }

    this.crud = CrudEstado.OTRO;
  }

  cancelar() {
    this.crud = CrudEstado.VIEW;
    this.params.clear()
    this.ngOnInit()
    //this.filtrarExtendido()
  }

  filtrarExtendido() {
    let map = new Map();

    /*map.set('fechaIniStr', (this.fechaInicio === null) ? '' : EncriptacionUtil.encriptarBase64(this.datepipe.transform(this.fechaInicio, 'dd/MM/yyyy HH:mm:ss')));
    map.set('fechaFinStr', (this.fechaFin === null) ? '' : EncriptacionUtil.encriptarBase64(this.datepipe.transform(this.fechaFin, 'dd/MM/yyyy HH:mm:ss')));*/

    map.set('fechaIniStr', (this.fechaInicio === null) ? '' : EncriptacionUtil.encrypt(this.datepipe.transform(this.fechaInicio, 'yyyy-MM-dd')));
    map.set('fechaFinStr', (this.fechaFin === null) ? '' : EncriptacionUtil.encrypt(this.datepipe.transform(this.fechaFin, 'yyyy-MM-dd')));

    this.filtrar(map);
  }

  hasPermissionAccion(nombreAccion: string): boolean {
    this.hasPermission(Endpoints.FORM_BITACORA);
    return this.permisosVista.includes(nombreAccion);
  }

}
