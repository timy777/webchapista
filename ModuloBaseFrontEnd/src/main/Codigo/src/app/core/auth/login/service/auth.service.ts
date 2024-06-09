import { Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginOutput } from '../dto/login.output';
import { Endpoints } from '@app/core/global/endpoints';
import { Router } from '@angular/router';
import { LoginInput } from '../dto/login.input';
import { HttpResponseUtil } from '@app/core/global/http.response.util';
import { environment } from '@env/environment';
import { CrudService } from '@app/core/global/crud.service';
import { EventEmitter } from 'events';
import { timeout } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '@app/core/modal/service/modal.component.service';
import { SessionStorageUtil } from '@app/core/global/utils/sesion.storage.util';
import { EncriptacionUtil } from '@app/core/global/utils/encriptacion.util';


@Injectable({ providedIn: 'root' })
export class AuthService {

    @Output() michange = new EventEmitter();

    private currentUserSubject: BehaviorSubject<LoginOutput>;
    public currentUser: Observable<LoginOutput>;
    public nombreUsuario: string;

    private mapPermisosSubject: BehaviorSubject<Map<string, string>>;
    public mapPermisos: Observable<Map<string, string>>;

    constructor(private router: Router, private http: HttpClient,
        private ngModal: NgbModal, private modalService: ModalService) {
        let data = null;
        if (SessionStorageUtil.existItem('currentUser')) {
            data = SessionStorageUtil.getItemDencryt('currentUser');
        }
        this.currentUserSubject = new BehaviorSubject<LoginOutput>(JSON.parse(data));
        this.currentUser = this.currentUserSubject.asObservable();

        data = null;
        if (SessionStorageUtil.existItem('permisosUser')) {
            data = SessionStorageUtil.getItemDencryt('permisosUser');
        }
        this.mapPermisosSubject = new BehaviorSubject<Map<string, string>>(JSON.parse(data));
        this.mapPermisos = this.mapPermisosSubject.asObservable();
    }

    configModal = {
        backdrop: false,
        // size: 'dialog-centered',
    };

    autenticacionCorecta() {
        this.michange.emit('');
    }

    public get currentUserValue(): LoginOutput {
        return this.currentUserSubject.value;
    }

    public get mapPermisosValue(): Map<string, string> {
        return this.mapPermisosSubject.value;
    }

    public currentUserValueStore(): LoginOutput {
        let data = null;
        if (SessionStorageUtil.existItem('currentUser')) {
            data = SessionStorageUtil.getItemDencryt('currentUser');
        }
        this.currentUserSubject = new BehaviorSubject<LoginOutput>(JSON.parse(data));
        return this.currentUserSubject.value;
    }

    public mapPermisosValueStore(): Map<string, string> {
        let data = null;
        if (SessionStorageUtil.existItem('permisosUser')) {
            data = SessionStorageUtil.getItemDencryt('permisosUser');
        }
        this.mapPermisosSubject = new BehaviorSubject<Map<string, string>>(new Map(JSON.parse(data)));
        return this.mapPermisosSubject.value;
    }

    async autenticar(input: LoginInput): Promise<LoginOutput> {
        return this.http.post<LoginOutput>(CrudService.CONTEXTO + Endpoints.LOGIN, input).
            toPromise().then((response: any) => {
                response.nombreUsuario = input.nombreUsuario;
                let mapPermisos2 = new Map<string, string>();
                for (let index = 0; index < response.modulos.length; index++) {
                    const element = response.modulos[index];
                    for (let j = 0; j < element.formularios.length; j++) {
                        const formulario = element.formularios[j];
                        let accionesPosible = '';
                        for (let k = 0; k < formulario.acciones.length; k++) {
                            accionesPosible = accionesPosible + formulario.acciones[k].nombre + ',';
                        }
                        mapPermisos2.set(formulario.url, accionesPosible)
                    }
                }
                EncriptacionUtil.secretKey = EncriptacionUtil.desencriptarBase64(response.fraseSecreta);
                //console.log('secretKey ', EncriptacionUtil.secretKey);
                //console.log('response = ',response)
                SessionStorageUtil.setItemEncrypt('user', input.nombreUsuario);
                SessionStorageUtil.setItemEncrypt('currentUser', response);
                SessionStorageUtil.setItemEncrypt('permisosUser', Array.from(mapPermisos2.entries()));
                SessionStorageUtil.setItemEncrypt('inactivityTime', response.inactivityTime);
                SessionStorageUtil.setItemEncrypt('timeout_backend', response.timeoutBackend);
                SessionStorageUtil.setItemEncrypt('url_no_timeout_backend', response.urlNoTimeoutBackend);
                
                this.autenticacionCorecta();

                return Promise.resolve(response);
            }).catch(error => HttpResponseUtil.handleErrorGeneric(error, this));
    }

    controlarSesion(time: number) {
        //setTimeout(() => { this.sessionExpirada(); }, 1794000);
        setTimeout(() => { this.sessionExpirada(); }, time);
        console.log(timeout)
    }

    async sessionExpirada() {
        this.router.navigate([environment.maSesionExpirada]);
        //this.ngModal.open(modalLogin, { size: 'lg', backdrop: false });
        //this.modalService.close("custom-modal-1");
        console.log("session expirada")
        //this.modalService.open("custom-modal");
    }

    async sessionInactiva() {
        //console.log("sesionInactiva()" + environment.maSesionInactiva)

        this.router.navigate([environment.maSesionInactiva]);
    }

    logout() {
        // remove user from local storage to log user out
        /*sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('permisosUser');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('perfil');
        sessionStorage.removeItem('rol');
        sessionStorage.removeItem('bitacora');
        sessionStorage.removeItem('adjunto');
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('log.sistema');
        sessionStorage.removeItem('etiqueta');
        sessionStorage.removeItem('grupo');
        sessionStorage.removeItem('parametro');
        sessionStorage.removeItem('inactivityTime');
        sessionStorage.removeItem('idtipoparametro');
        sessionStorage.removeItem('parametrizacion');
        sessionStorage.removeItem('timeout_backend');
        sessionStorage.removeItem('url_no_timeout_backend');*/
        SessionStorageUtil.clear();

        this.currentUserSubject.next(null);
        this.router.navigate([environment.maLongin]);
    }

    getInactivityTime(): string {
        //if (sessionStorage.getItem('inactivityTime') !== null)
        if (SessionStorageUtil.existItem('inactivityTime')){
            //return this.decryptAES(sessionStorage.getItem('inactivityTime'));
            return SessionStorageUtil.getItemDencryt('inactivityTime');
        }else {
            return '0';
        }
    }

    noAutorizado() {
        this.router.navigate([environment.maNoAutorizado], {});
    }

    redirectHome() {
        this.router.navigate([environment.maDashboard], {});
    }

    home() {
        return environment.maDashboard;
    }

    redireccionar(url: string, queryParams: { queryParams: {} }) {
        this.router.navigate([url], queryParams);
    }


    getPermissionView(urlForm: string): string {
        let resultado = '';
        //console.log("*********** OAC HABILITADA ***********");
        this.mapPermisosValueStore().forEach((value: string, key: string) => {
            //if (('/v1' + key) === this.router.url) {
            if (key === urlForm) {
                //console.log('encontro key: ', key, ', value: ', value, ", router-url: ", this.router.url);
                resultado = value;
            }
        });
        return resultado;
    }

    hasPermissionAccion(nombreAccion: string, permissionsView: string): boolean {
        /*let resultado = false;
        console.log("************ OAC PERMISION ************");       
        for (let modulo of this.currentUserSubject.value.modulos) {
            let formulario = modulo.formularios.find(formulario => formulario.url === permissionsView);
            console.log("==== formulario: ", formulario, ", nombreAccion: ", nombreAccion + ", permissionsView: ", permissionsView);
            if (formulario != null) {
                let accion = formulario.acciones.find(accion => accion.nombre === nombreAccion);
                console.log("==== accion: ", accion);
                if (accion != null) {
                    console.log("=== tiene permiso => nombreAccion: ");
                    resultado = true;
                }
                break;
            }
        }*/
        return permissionsView.includes(nombreAccion);
    }

}
