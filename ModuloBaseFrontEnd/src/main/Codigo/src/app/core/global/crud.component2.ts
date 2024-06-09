import { Page } from '@app/core/global/page';
import { CrudEstado } from '@app/core/global/crud.estado';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CrudService } from './crud.service';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { Location } from '@angular/common';
//import { EtiquetaService } from '../etiqueta/service/etiqueta.service';
import { SideBarService } from '../sidebar/side.bar.service';
import { ComponenteListar } from '@app/core/global/componente.listar';

export abstract class CrudComponentV2<I, T, P> extends ComponenteListar<I, T, P> {

    public profileForm: FormGroup;
    public profileForm2: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
        service: CrudService<I, T, P>,
        location: Location,
        messageService: MessageService,
        sideBarService: SideBarService,
        authService: AuthService,
        confirmationService: ConfirmationService,        
        grupoEtiqueta: string) {
        super(service, location, messageService, sideBarService, authService,
            confirmationService, grupoEtiqueta);
    }

    public async nuevo() {
        try {
            await this.preNuevo().then(resultado => {
                if (!resultado) {
                    return;
                }

                this.dto = null;
                this.crud = CrudEstado.NUEVO;

                this.getProfileForm(this.getInstance());
            });
        } catch (ex) {
            this.crud = CrudEstado.VIEW;
            this.mensajeError("Error en el procesamiento, " + ex['message'] + ", comuniquese con el administrador.");
        }
    }

    public async editar() {
        //console.log('editar= ',this.dto);

        if (this.dto === null) {
            this.mensajeError('Seleccione un registro');
            return;
        }

        try {
            await this.preEditar().then(resultado => {
                if (!resultado) {
                    return;
                }

                this.crud = CrudEstado.EDITAR;

                this.getProfileForm(this.dto);
            });
        } catch (ex) {
            this.crud = CrudEstado.VIEW;
            this.mensajeError("Error en el procesamiento, " + ex['message'] + ", comuniquese con el administrador.");
        }
    }


    public eliminar() {
        if (this.dto === null) {
            this.mensajeError('Seleccione un registro');
            return;
        }

        try {
            this.confirmationService.confirm({
                message: 'Esta seguro que desea eliminar el resgistro?',
                accept: async () => {
                    if (!this.preEliminar()) {
                        return;
                    }

                    this.proceso = true;

                    await this.service.eliminar(this.getIdentificador()).
                        then(() => {
                            this.postEliminar();
                            this.reload()
                            this.mensajeInformacion('Registro eliminado');
                        }).
                        catch(err => {
                            this.proceso = false;
                            this.mensajeError(err);
                        });
                }
            });
        } catch (ex) {
            this.mensajeError("Error en el procesamiento, " + ex['message'] + ", comuniquese con el administrador.");
        }
    }

    /*public editarRow(rowData: T) {
        this.dto = rowData;
        this.editar();
    }

    public eliminarRow(rowData: T) {
        this.dto = rowData;
        this.eliminar();
    } */

    public async guardar() {
        try {
            if (!this.preValidacion()) {
                return;
            }

            this.proceso = true;
            await this.service.crear(this.getDatosCrearActualizar()).
                then(() => {
                    this.posGuardar();
                    this.reload()
                    this.mensajeOk('Registro guardado');
                }).
                catch(err => {
                    this.proceso = false;
                    this.mensajeError(err);
                });
        } catch (ex) {
            this.proceso = false;
            this.mensajeError("Error en el procesamiento, " + ex['message'] + ", comuniquese con el administrador.");
        }
    }

    public async actualizar() {
        try {
            if (!this.preValidacion()) {
                return;
            }
            
            this.proceso = true;
            await this.service.actualizar(this.getDatosCrearActualizar(), this.getIdentificadorEncriptado()).
                then(() => {
                    this.posActualizar();
                    this.reload()
                    this.mensajeOk('Registro actualizado');
                }).
                catch(err => {
                    this.mensajeError(err);
                }).finally(() => {
                    this.proceso = false;
                });
        } catch (ex) {
            this.proceso = false;
            this.mensajeError("Error en el procesamiento, " + ex['message'] + ", comuniquese con el administrador.");
        }
    }

    public cancelar() {
        try {
            if (!this.preCancelar()) {
                return;
            }

            this.reload().then(() => this.postCancelar());
        } catch (ex) {
            this.mensajeError("Error en el procesamiento, " + ex['message'] + ", comuniquese con el administrador.");
        }
    }

    abstract getIdentificador(): P;

    abstract getIdentificadorEncriptado(): P;

    abstract getInstance(): T;

    abstract getDatosCrearActualizar(): I;

    abstract getProfileForm(data: T);

    abstract preNuevo(): Promise<boolean>;

    abstract preEditar(): Promise<boolean>;

    abstract preEliminar(): Promise<boolean>;

    abstract preValidacion(): Promise<boolean>;

    abstract preCancelar(): Promise<boolean>;

    abstract posGuardar();

    abstract posActualizar();

    abstract postEliminar();

    abstract postCancelar();

}