import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from '../service/modal.component.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { LoginInput } from '@app/core/auth/login/dto/login.input';
import { LoginOutput } from '@app/core/auth/login/dto/login.output';
import { ParametroService } from '@app/core/parametro/service/parametro.service';
import { Router } from '@angular/router';
import { ParametroNombre } from '@app/core/parametro/dto/parametro.nombre';
import { EncriptacionUtil } from '@app/core/global/utils/encriptacion.util';
import { SessionStorageUtil } from '@app/core/global/utils/sesion.storage.util';

@Component({
  selector: 'jw-modal',
  templateUrl: './modalcomponent.component.html',
  styleUrls: ['./modalcomponent.component.scss'],
})
export class ModalcomponentComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;


  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private modalService: ModalService,
    private el: ElementRef, private parametroService: ParametroService, private router: Router) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', el => {
      if (el.target.className === 'jw-modal') {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    console.log("Modal onSubmit ")
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    console.log("usuario" + this.f['username'].value + " password" + this.f['password'].value)
    this.authService.autenticar(new LoginInput(this.f['username'].value, this.f['password'].value)).then
      ((data: LoginOutput) => {
        this.authService.nombreUsuario = this.f['username'].value;
        this.obtenerInactivityTime();
        this.limpiarDatos();
        this.closeModal();
        console.log("exitoso")
      }).catch(
        (error: string) => {
          this.error = error;
          this.loading = false;
          console.log("limpiar ")
          this.limpiarDatos();
          this.limpiarData();
        });
  }
  obtenerInactivityTime() {
    //let paramIdEncript = EncriptacionUtil.encriptarBase64(ParametroId.INACTIVITY_TIME.toString());
    let paramIdEncript = EncriptacionUtil.encrypt(ParametroNombre.INACTIVITY_TIME.toString());
    console.log("paramIdEncript: " + paramIdEncript);
    this.parametroService.obtener(paramIdEncript).
      then(data => {
        //sessionStorage.setItem('inactivityTime', this.authService.encryptAES(data.valor));
        SessionStorageUtil.setItemEncrypt('inactivityTime', data.valor);

      });
  }

  closeModal() {
    this.close();
  }

  limpiarDatos() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loading = false;
    this.submitted = false;
    this.error = '';
  }

  limpiarData() {
    this.authService.logout();
  }

}
