import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { LoginInput } from '../dto/login.input';
import { LoginOutput } from '../dto/login.output';
import { environment } from '@env/environment';
import { EtiquetaService } from '@app/core/etiqueta/service/etiqueta.service';
import { EtiquetaOutput } from '@app/core/etiqueta/dto/etiqueta.output';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SideBarService } from '@app/core/sidebar/side.bar.service';
import { ParametroService } from '@app/core/parametro/service/parametro.service';
import { ParametroNombre } from '@app/core/parametro/dto/parametro.nombre';
import { EncriptacionUtil } from '@app/core/global/utils/encriptacion.util';
import { SessionStorageUtil } from '@app/core/global/utils/sesion.storage.util';

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    //returnUrl: string;
    error = '';
    titulo: string;
    titiloLlave: string = 'login.titulo';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private parametroService: ParametroService,
        private router: Router,
        private authService: AuthService,
        private sideBarService: SideBarService,
        private etiquetaService: EtiquetaService,
        private ngModal: NgbModal
    ) {
        if (authService.currentUserValue) {
            authService.redirectHome();
            return;
        }
        this.obtenerEtiquetas();
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService.autenticar(new LoginInput(this.f['username'].value, this.f['password'].value)).then
            // let login : LoginInput=new LoginInput(this.f['username'].value, this.f['password'].value);
            ((data: LoginOutput) => {
                /*this.sideBarService.toggleOpen();
                this.authService.nombreUsuario = this.f['username'].value;
                this.obtenerTodas();
                this.obtenerInactivityTime();
                sessionStorage.setItem('idtipoparametro','1');

                this.router.navigate([environment.maDashboard]);//([this.returnUrl]);*/
                //console.log('entro aqui ' ,data);
                /*this.obtenerInactivityTime();
                this.obtenerTimoutBackend();
                this.obtenerUrlNoTimoutBackend();*/
                this.sideBarService.toggleOpen();
                this.authService.nombreUsuario = this.f['username'].value;
                this.obtenerTodas();

                //sessionStorage.setItem('idtipoparametro', '1');
                SessionStorageUtil.setItem('idtipoparametro', '1');

                this.router.navigate([environment.maDashboard]);//([this.returnUrl]);
            }).catch(
                (error: string) => {
                    this.error = error;
                    this.loading = false;
                });
    }

    async obtenerEtiquetas() {
        try {
            await this.etiquetaService.obtenerPorLlave(this.titiloLlave).
                then((dato: EtiquetaOutput[]) => {
                    this.titulo = dato[0].valor;
                }).catch(error => console.log(error));
        } catch (ex) {
            console.log(ex);
        }
    }

    obtenerEtiquetasPorGrupo(grupo: string) {
        let jsonObject = {};
        this.etiquetaService.obtenerPorGrupo(grupo).then(data => {
            data.forEach(etiqueta => {
                jsonObject[etiqueta.llave] = etiqueta.valor;
            });
            //sessionStorage.setItem(grupo, this.authService.encryptAES(JSON.stringify(jsonObject)));
            SessionStorageUtil.setItemEncrypt(grupo, jsonObject);

        }).catch(err => {
            console.log(err);
        });

    }

    /*obtenerInactivityTime() {
        let paramIdEncript = EncriptacionUtil.encriptarBase64(ParametroNombre.INACTIVITY_TIME.toString());
        this.parametroService.obtener(paramIdEncript).
            then(data => {
                console.log("tiempo de inactividad " + JSON.stringify(data));

                sessionStorage.setItem('inactivityTime', this.authService.encryptAES(data.valor));

            });
    }

    obtenerTimoutBackend() {
        let paramIdEncript = EncriptacionUtil.encriptarBase64(ParametroNombre.TIME_OUT_BACKEND.toString());
        this.parametroService.obtener(paramIdEncript).
            then(data => {
                sessionStorage.setItem('timeout_backend', this.authService.encryptAES(data.valor));
            });
    }

    obtenerUrlNoTimoutBackend() {
        let paramIdEncript = EncriptacionUtil.encriptarBase64(ParametroNombre.URL_NO_TIME_OUT_BACKEND.toString());

        this.parametroService.obtener(paramIdEncript).
            then(data => {
                console.log("url no aplica tiempo de espera del backend " + JSON.stringify(data));
                sessionStorage.setItem('url_no_timeout_backend', this.authService.encryptAES(data.valor));
            });
    }*/

    obtenerTodas() {
        this.obtenerEtiquetasPorGrupo('rol');
        this.obtenerEtiquetasPorGrupo('usuario');
        this.obtenerEtiquetasPorGrupo('bitacora');
        this.obtenerEtiquetasPorGrupo('etiqueta');
        this.obtenerEtiquetasPorGrupo('grupo');
        this.obtenerEtiquetasPorGrupo('log.sistema');
        this.obtenerEtiquetasPorGrupo('parametro');
        this.obtenerEtiquetasPorGrupo('parametrizacion');
        this.obtenerEtiquetasPorGrupo('plantilla');
        //this.obtenerEtiquetasPorGrupo('perfil');  // no se utiliza
    }

    configModal = {
        backdrop: false,
        // size: 'dialog-centered',
    };

    usernameChange: string;
    oldPassword: string;
    newPassword: string;
    repNewPass: string;

    showpopup(modalResetPassword): void {
        this.step = 1;
        this.ngModal.open(modalResetPassword, this.configModal);
    }
    step: number;
    cancel(close): void {
        close();
    }

    continue(): void {
        this.step++;
    }
}
