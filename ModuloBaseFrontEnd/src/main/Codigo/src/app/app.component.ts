import { Component } from '@angular/core';
import { LoginOutput } from './core/auth/login/dto/login.output';
import { AuthService } from './core/auth/login/service/auth.service';
import { EtiquetaService } from './core/etiqueta/service/etiqueta.service';
import { SideBarService } from './core/sidebar/side.bar.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SessionStorageUtil } from './core/global/utils/sesion.storage.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  piePagina = '';
  piePaginallave = 'pie.pagina';
  etiqueta: Map<string, string> = new Map<string, string>();
  currentUser: LoginOutput;
  collapedSideBar: boolean;

  dashboardIzquierdo: any
  dashboardDerecho: any

  pepe: any;
  time: any;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService,
    private sideBarService: SideBarService,
    private etiquetaService: EtiquetaService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    /*this.sideBarService.change.subscribe(isOpen => {
      if(this.dashboardIzquierdo === null || this.dashboardIzquierdo === undefined) {
        if (this.authService.currentUserValue !== null && this.authService.currentUserValue !== undefined) {
          this.dashboardIzquierdo = this.sanitizer.bypassSecurityTrustResourceUrl(this.authService.currentUserValue.urlTableauIzquierdo);
        } else {
          this.dashboardIzquierdo = null;
        }
      }
    }); */
    this.obtenerEtiquetas();
    //document.documentElement.style.setProperty('--primary-color', '#0093fc');
    //document.documentElement.style.setProperty('--primary-color-text', 'black');
  }

  ngOnInit() {
    //sessionStorage.setItem('idtipoparametro','1');
    // Control de inactividad
    this.time = this.authService.getInactivityTime();
    //console.log('***dtn ', this.authService.getInactivityTime());
    clearTimeout(this.pepe);
    this.pepe = setTimeout(() => { this.authService.sessionInactiva(); }, Number(this.time) * 60000);
    //this.pepe = setTimeout(() => { console.log('expiro la sesion') }, Number(this.time) * 60000);
  }

  parar() {
    console.log('Hay actividad');
    this.time = this.authService.getInactivityTime();

    //console.log('***dtn ', this.authService.getInactivityTime());
    //console.log('time ', this.time);
    clearTimeout(this.pepe);
    //this.pepe = setTimeout(() => {  console.log('expiro la sesion'); this.authService.sessionInactiva(); }, Number(this.time) * 60000);
    this.pepe = setTimeout(() => {  console.log('expiro la sesion'); }, Number(this.time) * 60000);
  }

  private getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      console.log(c);
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  logout() {
    this.authService.logout();
  }

  estaAutenticado(): boolean {
    return this.authService.currentUserValueStore() != null;
  }

  esDashboard() {
    return this.router.url.indexOf('dashboard') >= 0;
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
    this.sideBarService.toggle();
  }

  async obtenerEtiquetas() {
    //var etiqueta = new Map();
    if(SessionStorageUtil.existItem('footer')) {
      this.etiqueta = JSON.parse(SessionStorageUtil.getItem('footer'));
      //console.log('existe footer app ', this.etiqueta);
      //console.log('salida app ', this.etiqueta[this.piePaginallave]);
      if(this.etiqueta[this.piePaginallave] !== null || this.etiqueta[this.piePaginallave] !== undefined) {
        this.piePagina = this.etiqueta[this.piePaginallave];
        return;
      }
    }

    try {
      await this.etiquetaService.obtenerPorLlave(this.piePaginallave).
        then((dato) => {
          this.etiqueta[this.piePaginallave] = dato[0].valor;
          SessionStorageUtil.setItem('footer', this.etiqueta);
          this.piePagina = dato[0].valor;
        })
        .catch(error => console.log(error));
    } catch (ex) {
      console.log(ex);
    }
  }

}