import { OnInit, Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { ConfirmationService, SelectItem, MessageService } from 'primeng/api';
import { ParametroInput } from '../dto/parametro.input';
import { ParametroOutput } from '../dto/parametro.output';
import { ParametroService } from '../service/parametro.service';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { PermisoService } from '@app/core/roles/service/permiso.service';
import { RolTipoParametroPermisoOutput } from '@app/core/roles/dto/rol.tipo.parametro.permiso.output';
import { Global } from '@app/core/global/constants';
import { PermisoTipo } from '@app/core/global/permiso.tipo';
import { Sort } from '@app/core/global/paginacion';
import { Location} from '@angular/common';
import { CrudComponentV2 } from '@app/core/global/crud.component2';
import { SideBarService } from '@app/core/sidebar/side.bar.service';
import { CrudEstado } from '@app/core/global/crud.estado';
import { CronGenComponent, CronOptions } from 'ngx-cron-editor';
import { ParametroTipoValor } from '../dto/parametro.tipo.valor';
import { EncriptacionUtil } from '@app/core/global/utils/encriptacion.util';
import { Endpoints } from '@app/core/global/endpoints';
import { SessionStorageUtil } from '@app/core/global/utils/sesion.storage.util';

@Component({
  selector: 'parametro',
  templateUrl: './parametro.component.html',
  styleUrls: ['./parametro.component.scss'],
})
export class ParametroComponent extends CrudComponentV2<ParametroInput, ParametroOutput, string>
  implements OnInit {

  list: ParametroOutput[];
  tipos: ParametroTipoValor[];
  tipoParametro: RolTipoParametroPermisoOutput;
  tiposParametros: RolTipoParametroPermisoOutput[];

  tiposParametrosSelectItem: SelectItem[];
  items: any[];
  idTP:any;  

  cronForm: FormControl;
  public isCronDisabled = false;
  public cronExpression = '0 0 1/1 * *';
  cronEditorDemo: CronGenComponent;

  public cronOptions: CronOptions = {
    formInputClass: 'form-control cron-editor-input',
    formSelectClass: 'form-control cron-editor-select',
    formRadioClass: 'cron-editor-radio',
    formCheckboxClass: 'cron-editor-checkbox',

    defaultTime: '00:00:00',

    hideMinutesTab: false,
    hideHourlyTab: false,
    hideDailyTab: false,
    hideWeeklyTab: false,
    hideMonthlyTab: false,
    hideYearlyTab: false,
    hideAdvancedTab: false,
    hideSpecificWeekDayTab: false,
    hideSpecificMonthWeekTab: false,

    use24HourTime: true,
    hideSeconds: false,

    cronFlavor: 'quartz' 
  };

  constructor(
    private permisoService: PermisoService,
    formBuilder: FormBuilder,
    service: ParametroService,
    location: Location,
    messageService: MessageService,
    sideBarService: SideBarService,
    authService: AuthService,
    confirmationService: ConfirmationService) {
    super(formBuilder, service, location, messageService, sideBarService,
      authService, confirmationService, 'parametro');
    this.list = [];
    this.tiposParametrosSelectItem = [];
    
  }


  async ngOnInit() {
    //console.log(JSON.stringify(this.cronForm))
    this.cronForm = new FormControl(this.cronExpression);
    //this.cronEditorDemo.options = this.cronOptions;
    try {
      this.tipos = ParametroTipoValor.TIPOS_VALORES;

      this.es = Global.obtenerCalendarEspanol();
     
    let encriptadoRolId = EncriptacionUtil.encrypt(this.authService.currentUserValue.rolId.toString());
    //console.log("rolIdEncriptado: "+encriptadoRolId);
      await this.permisoService
        .obtenerRolTiposParametrosPermisosPorRol(encriptadoRolId)
        .then(async (datos) => {
          this.tiposParametros = [];
          //console.log("JSON " + JSON.stringify(datos));
          datos.forEach((d) => {            
            if (d.tipoPermiso !== PermisoTipo.NINGUNO.valor) {
              this.tiposParametros.push(d);
            }

            this.tiposParametrosSelectItem.push({
              label: d.tipoParametroNombre,
              value: d.tipoParametroId,
            });
          });

          this.input.sort = new Sort('nombre', 'asc');
          this.input.size = 2000;

          await this.inicial();

          this.list = this.page.content;
          if (this.tiposParametros.length > 0) {
            this.idTP = sessionStorage.getItem('idtipoparametro');
            console.log('***dtn idTP ', this.idTP)
            if(this.idTP!=null && this.idTP!=undefined){
              this.tipoParametro = this.tiposParametros[this.idTP - 1];
              console.log('***dtn tiposParametros: ', this.tiposParametros);
              console.log('***dtn tipoParametro: ', this.tipoParametro);
              this.filtro(null, this.tipoParametro);
            }else{
              this.tipoParametro = this.tiposParametros[0];
              console.log('***dtn tiposParametros: ', this.tiposParametros);
              console.log('***dtn tipoParametro: ', this.tipoParametro);
              this.filtro(null, this.tipoParametro);
            }

          } else {
            this.filtro(null, null);
          }
        })
        .catch((err) => {console.log('Error es aqui 2', err); this.mensajeError(err);});
    } catch (ex) {
      this.mensajeError('Error en el procesamiento, ' +
      ex['message'] +
        ', comuniquese con el administrador.');
    }

  }

  esCadenaLista(tipo: number): boolean {
    return ParametroTipoValor.esCadenaLista(tipo);
  }

  esDate(tipo: number): boolean {
    return ParametroTipoValor.esDate(tipo);
  }

  esNumber(tipo: number): boolean {
    return ParametroTipoValor.esNumber(tipo);
  }

  esBool(tipo: number): boolean {
    return ParametroTipoValor.esBool(tipo);
  }

  esColor(tipo: number): boolean {
    return ParametroTipoValor.esColor(tipo);
  }

  esCronTab(tipo: number): boolean {
    return ParametroTipoValor.esConTab(tipo);
  }

  esPassword(tipo: number): boolean {
    return ParametroTipoValor.esPassword(tipo);
  }

  filtro(original: any, nuevo: RolTipoParametroPermisoOutput) {
    console.log('***dtn paso por aqui original: ' , original, ' nuevo: ', nuevo);
    if (nuevo === null || nuevo == undefined) {
      this.page.content = this.list;
      this.page.totalElements = this.list.length;
    } else {
      //sessionStorage.setItem('idtipoparametro', nuevo.tipoParametroId.toString());
      SessionStorageUtil.setItem('idtipoparametro', nuevo.tipoParametroId);

      this.page.content = this.list.filter(
        (parametro) => parametro.tipoParametroId === nuevo.tipoParametroId
      );
      //this.params.set('idtipoparametro', nuevo.tipoParametroId + '')
      SessionStorageUtil.setItem('idtipoparametro', nuevo.tipoParametroId + '');
      this.page.totalElements = this.page.content.length;
    }
  }

  getIdentificador(): string {
    return this.dto.id;
  }

  getIdentificadorEncriptado(): string {
    return EncriptacionUtil.encrypt(this.dto.id.toString());
  }

  getInstance(): ParametroOutput {
    return ParametroOutput.getInstance();
  }

  getDatosCrearActualizar(): ParametroInput {
    console.log("datos antes de actualizar "+JSON.stringify(this.profileForm.value))
    let valorFinal = null;

    if (ParametroTipoValor.esBool(this.profileForm.value.tipoParametro)) {
      valorFinal = this.profileForm.value.valorBoolean;
    }

    if (ParametroTipoValor.esCadenaLista(this.profileForm.value.tipoParametro)) {
      valorFinal = this.profileForm.value.valorCadenaLista;
    }

    if (ParametroTipoValor.esDate(this.profileForm.value.tipoParametro)) {
      valorFinal = this.profileForm.value.valorDate;
    }

    if (ParametroTipoValor.esColor(this.profileForm.value.tipoParametro)) {
      valorFinal = this.profileForm.value.valorColor;
    }

    if (ParametroTipoValor.esNumber(this.profileForm.value.tipoParametro)) {
      valorFinal = this.profileForm.value.valorNumber;
    }

    if (ParametroTipoValor.esConTab (this.profileForm.value.tipoParametro)) {
     // valorFinal = this.profileForm.value.valorCadenaLista;
        //console.log("cron tab value "+this.cronForm.value.toString())
        valorFinal=this.cronForm.value.toString()
    }

    if (ParametroTipoValor.esPassword(this.profileForm.value.tipoParametro)) {
         //console.log("value "+this.profileForm.value.valorPassword)
         valorFinal = this.profileForm.value.valorPassword;
     }

    return new ParametroInput(
      this.profileForm.value.nombre,
      this.profileForm.value.tipoParametro,
      valorFinal,
      this.profileForm.value.descripcion,
      this.profileForm.value.tipoParametroId
    );
  }

  getProfileForm(data: ParametroOutput) {
    //console.log("antes guardar "+ data.tipo)
    let valorBool = null;
    let valorCadenaLista = null;
    let valorDate = null;
    let valorColor = null;
    let valorNumber = null;
    let valorPassword = null;
    //let valorCrontab = null;

    if (ParametroTipoValor.esBool(data.tipo)) {
      valorBool = data.valor === 'true';
    } else {
      valorBool = true;
    }

    if (ParametroTipoValor.esCadenaLista(data.tipo)) {
      valorCadenaLista = data.valor;
    } else {
      valorCadenaLista = '';
    }

    if (ParametroTipoValor.esDate(data.tipo)) {
      valorDate = new Date(Date.parse(data.valor));
    } else {
      valorDate = new Date();
    }

    if (ParametroTipoValor.esColor(data.tipo)) {
      valorColor = data.valor;
    } else {
      valorColor = '#000';
    }

    if (ParametroTipoValor.esNumber(data.tipo)) {
      valorNumber = parseFloat(data.valor);
    } else {
      valorNumber = 0;
    }

    if (ParametroTipoValor.esPassword(data.tipo)) {
      valorPassword = '';
    }

    if (ParametroTipoValor.esConTab(data.tipo)) {
      //valorCrontab = data.valor;
      this.cronForm = new FormControl(data.valor);
    } else {
      //valorCrontab = '';
      this.cronForm = new FormControl('');
    }

    const temp = this.tipos.find((t) => t.tipo === data.tipo);
    //console.log("Tipo: " + JSON.stringify(temp))
    let tipoTemp = '' + data.tipo;

    if(temp !== null && temp !== undefined) {
      tipoTemp = temp.nombre
    }

    //console.log("tipoTemp: " + JSON.stringify(tipoTemp))
    this.profileForm = this.formBuilder.group({
      nombre: [
        data.nombre,
        Validators.compose([Validators.required, Validators.maxLength(255)]),
      ],
      tipo: [
        tipoTemp,
        Validators.compose([Validators.required]),
      ],
      tipoParametro: [
        data.tipo,
        Validators.compose([]),
      ],
      valorCadenaLista: [
        valorCadenaLista,
        Validators.compose([Validators.maxLength(4000)]),
      ],
      valorNumber: [valorNumber],
      valorPassword: [valorPassword],
      valorDate: [valorDate],
      valorBoolean: [valorBool],
      valorColor: [valorColor],
      descripcion: [
        data.descripcion,
        Validators.compose([Validators.maxLength(500)]),
      ],
      tipoParametroId: [data.tipoParametroId, Validators.required],
    });
  }

  establecerValoresPorDefecto() {
  }

  sortColumna(columna: string): string {
    return columna
  }

  setFiltroPorDefecto(filters: any) {
  }

  camposFiltrar(filters: any): Map<string, string> {
    let map = new Map();

    map.set('nombre', this.campoFiltrar(filters.nombre));
    map.set('valor', this.campoFiltrar(filters.valor));
    map.set('descripcion', this.campoFiltrar(filters.descripcion));

    return map;
  }

  exportColumnas(data: any[]): any[] {
    let temp: any[] = []
    let registro = '';
    data.forEach(d => {
      registro = '{ "' + this.obtenerEtiqueta('tbl.nombre') + '": "' + d.nombre + '", '
      registro = registro + '"' + this.obtenerEtiqueta('tbl.valor') + '": "' + d.valor + '", '
      registro = registro + '"' + this.obtenerEtiqueta('tbl.descripcion') + '": "' + d.descripcion + '" '
      registro = registro + '}'
      temp.push(JSON.parse(registro))
    })

    return temp
  }

  async preNuevo(): Promise<boolean> {
    return Promise.resolve(true);
  }

  async preEditar(): Promise<boolean> {
    if (this.dto === null || this.dto === undefined) {
      this.mensajeError('Seleccione un registro');
      return Promise.resolve(false);
    }
    
    if (!this.dto.editable) {
      this.mensajeError('Parametro no editable.');
      return Promise.resolve(false);
    }
    let rolIdEncriptado = EncriptacionUtil.encrypt(this.authService.currentUserValue.rolId.toString());
    console.log("rolIdEncriptado: "+rolIdEncriptado);
    return await this.permisoService
      .obtenerRolTiposParametrosPermisosPorRol(
        //this.authService.currentUserValue.rolId
        rolIdEncriptado
      )
      .then(async (datos) => {
        this.tiposParametros = datos;
        this.tiposParametrosSelectItem = [];

        await datos.forEach((d) => {
          this.tiposParametrosSelectItem.push({
            label: d.tipoParametroNombre,
            value: d.tipoParametroId,
          });
        });

        return Promise.resolve(true);
      })
      .catch((err) => {
        console.log('Error es aqui 1', err);
        
        this.mensajeError(err);
        return Promise.resolve(false);
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

  posGuardar() { }

  posActualizar() {
    this.crud = CrudEstado.VIEW;
  }

  postEliminar() { }

  postCancelar() {
    this.crud = CrudEstado.VIEW;
  }

  getColumnas(): any[] {
    return [
      { field: 'id', header: 'ID', class: 'col_id', width:'5%' },
      { field: 'nombre', header: this.obtenerEtiqueta('tbl.nombre'), width:'20%' },
      { field: 'valor', header: this.obtenerEtiqueta('tbl.valor'), width:'20%' },
      { field: 'descripcion', header: this.obtenerEtiqueta('tbl.descripcion'), width:'55%' },
    ]
  }
  
  onFilter(event) {
    console.log('event ' + JSON.stringify(event))
    if (event.filters.nombre !== null && event.filters.nombre !== undefined) {
      this.params.set('nombre', event.filters.nombre.value)
    } else {
      this.params.set('nombre', '')
    }
    if (event.filters.valor !== null && event.filters.valor !== undefined) {
      this.params.set('valor', event.filters.valor.value)
    } else {
      this.params.set('valor', '')
    }
    if (event.filters.descripcion !== null && event.filters.descripcion !== undefined) {
      this.params.set('descripcion', event.filters.descripcion.value)
    } else {
      this.params.set('descripcion', '')
    }
  }

  hasPermissionAccion(nombreAccion: string): boolean {
    this.hasPermission(Endpoints.FORM_PARAMETRO);
    return this.permisosVista.includes(nombreAccion);
  }
}
