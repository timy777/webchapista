import { OnInit, Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { Sort } from '@app/core/global/paginacion';
import { Location, DatePipe } from '@angular/common';
import { LogSistemaOutput } from '../dto/log.sistema.output';
import { CrudEstado } from '@app/core/global/crud.estado';
import { LogSistemaService } from '../service/log.sistema.service';
import { SideBarService } from '@app/core/sidebar/side.bar.service';
import { ComponenteListar } from '@app/core/global/componente.listar';
import { ParametroService } from '@app/core/parametro/service/parametro.service';
import { EncriptacionUtil } from '@app/core/global/utils/encriptacion.util';
import { SessionStorageUtil } from '@app/core/global/utils/sesion.storage.util';

@Component({
  selector: "log-sistema",
  templateUrl: "./log.sistema.component.html",
  styleUrls: ["./log.sistema.component.scss"],
})
export class LogSistemaComponent extends ComponenteListar<any, LogSistemaOutput, number> implements OnInit {

  aplicacionesFilter: SelectItem[];
  nivelesFilter: SelectItem[];
  procesosFilter: SelectItem[];
  items: any[];

  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  fechaMinima: Date;
  fechaActual: Date;

  constructor(
    service: LogSistemaService,
    location: Location,
    private parametroService: ParametroService,
    private datepipe: DatePipe,
    messageService: MessageService,
    sideBarService: SideBarService,
    authService: AuthService,
    confirmationService: ConfirmationService) {
    super(service, location, messageService, sideBarService,
      authService, confirmationService, 'log.sistema');
  }

  ngOnInit() {
    //sessionStorage.setItem('idtipoparametro','1');
    SessionStorageUtil.setItem('idtipoparametro', '1');
    this.fechaActual = new Date();
    this.fechaMinima = new Date('2024-01-01');

    /*this.fechaMinima = new Date();
    this.fechaMinima.setDate((new Date()).getDate() - 3000);
    let paramIdEncript = EncriptacionUtil.encriptarBase64(ParametroNombre.BITACORA_LOG_SISTEMA_DIAS_ATRAS.toString());
    // console.log("paramIdEncript: " + paramIdEncript);
    this.parametroService.obtener(paramIdEncript).
    then(data => {
      this.fechaMinima.setDate((new Date()).getDate() - Number(data.valor));
    });*/

    this.aplicacionesFilter = [];
    this.aplicacionesFilter.push({ label: 'Todos', value: null })
    this.aplicacionesFilter.push({ label: 'Sistema', value: 'Sistema' })
    
    this.nivelesFilter = [];
    this.nivelesFilter.push({ label: 'Todos', value: null })
    this.nivelesFilter.push({ label: 'DEBUG', value: 'DEBUG' })
    this.nivelesFilter.push({ label: 'INFO', value: 'INFO' })
    this.nivelesFilter.push({ label: 'WARN', value: 'WARN' })
    this.nivelesFilter.push({ label: 'ERROR', value: 'ERROR' })

    this.procesosFilter = [];
    this.procesosFilter.push({ label: 'Todos', value: null })

    this.input.sort = new Sort('id', 'desc');

    this.inicial(true);
    this.items = [
      { label: this.obtenerEtiqueta('Visualizar'),command: (event => this.visualizar())}      
    ];
    //console.log(" init ")
  }

  getColumnas(): any[] {
    //console.log(" getcolumns ")
    return [
      { field: 'id', header: this.obtenerEtiqueta('tbl.id'), class: 'col_id', width:'10%' },
      { field: 'fechaRegistro', header: this.obtenerEtiqueta('tbl.fecha.registro'), class: 'col_fecha_registro', width:'20%' },
      { field: 'app', header: this.obtenerEtiqueta('tbl.app'), class: 'col_aplicacion', width:'15%' },
      { field: 'trazabilidad', header: this.obtenerEtiqueta('tbl.trazabilidad'), class: 'col_trazabilidad', width:'15%' },
      { field: 'nivel', header: this.obtenerEtiqueta('tbl.nivel'), class: 'col_nivel', width:'15%' },
      { field: 'proceso', header: this.obtenerEtiqueta('tbl.proceso'), class: 'col_proceso', width:'25%' }
    ];
  }

  establecerValoresPorDefecto() {
  }

  sortColumna(columna: string): string {
    if (columna === 'fechaRegistro') {
      return 'fecha_registro'
    }

    return columna
  }

  setFiltroPorDefecto(filters: any) {
  }

  camposFiltrar(filters: any): Map<string, string> {
    let map = new Map();

    map.set('fechaIniStr', (this.fechaInicio === null) ? '' : EncriptacionUtil.encrypt(this.datepipe.transform(this.fechaInicio, 'yyyy-MM-dd')));
    map.set('fechaFinStr', (this.fechaFin === null) ? '' : EncriptacionUtil.encrypt(this.datepipe.transform(this.fechaFin, 'yyyy-MM-dd')));

    map.set('id', this.campoFiltrar(filters.id));
    map.set('fechaRegistro', this.campoFiltrar(filters.fechaRegistro));
    map.set('app', this.campoFiltrar(filters.app));
    map.set('trazabilidad', this.campoFiltrar(filters.trazabilidad));
    map.set('nivel', this.campoFiltrar(filters.nivel));
    map.set('proceso', this.campoFiltrar(filters.proceso));

    return map;
  }

  exportColumnas(data: any[]): any[] {
    let temp: any[] = []
    data.forEach(d => {
      let registro: any = {};
      registro[this.obtenerEtiqueta('tbl.id')] = d.id 
      registro[this.obtenerEtiqueta('tbl.fecha.registro')] = d.fechaRegistro 
      registro[this.obtenerEtiqueta('tbl.app')] = d.app 
      registro[this.obtenerEtiqueta('tbl.trazabilidad')] = d.trazabilidad 
      registro[this.obtenerEtiqueta('tbl.nivel')] = d.nivel 
      registro[this.obtenerEtiqueta('tbl.proceso')] = d.proceso 
      temp.push(registro)
    })

    return temp
  }

  visualizar() {
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

    map.set('fechaIniStr', (this.fechaInicio === null) ? '' : EncriptacionUtil.encrypt(this.datepipe.transform(this.fechaInicio, 'yyyy-MM-dd')));
    map.set('fechaFinStr', (this.fechaFin === null) ? '' : EncriptacionUtil.encrypt(this.datepipe.transform(this.fechaFin, 'yyyy-MM-dd')));

    this.filtrar(map);
  }

}
/*
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('copiableContainer');
  container.addEventListener('keydown', function(event) {
    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault();
      return false;
    }
  });
  container.addEventListener('paste', function(event) {
    event.preventDefault();
    return false;
  });
}); */