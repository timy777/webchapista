import { Page } from '@app/core/global/page';
import { CrudEstado } from '@app/core/global/crud.estado';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { CrudService } from './crud.service';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { Paginacion, Sort } from './paginacion';
import { Location } from '@angular/common';
//import { EtiquetaService } from '../etiqueta/service/etiqueta.service';
import { SideBarService } from '../sidebar/side.bar.service';
import { ComponenteGenerico } from './componente.generico';
import { Dropdown } from 'primeng/dropdown';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Directive, Input, Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

// import json5 = require('json5');
@Injectable()
export abstract class ComponenteListar<I, T, P> extends ComponenteGenerico {

    public params: Map<string, string> = new Map<string, string>();
    public input: Paginacion = new Paginacion(10, 0, null);

    public crud: CrudEstado;
    public page: Page<T>;
    public dto: T;

    public filters: Map<string, string>;
    public filtroPorDefecto: boolean;
    public scrollHeight = '100px';

    public loading: boolean;

    public cols: any[];

    constructor(
        public service: CrudService<I, T, P>,
        location: Location,
        messageService: MessageService,
        sideBarService: SideBarService,
        authService: AuthService,
        confirmationService: ConfirmationService,        
        grupoEtiqueta: string) {
        super(location, messageService, sideBarService, authService,
            confirmationService, grupoEtiqueta);
        this.page = Page.getInstance<T>();
        this.crud = CrudEstado.VIEW;
        this.filtroPorDefecto = true;
    }

    public async inicial(lazy?: boolean) {
        //console.log("**** paso x aqui....");
        this.loading = true;
        this.dto = null;
        this.proceso = false;
        this.crud = CrudEstado.VIEW;
        try {
            if (lazy === null || lazy === undefined || lazy === false) {
                await this.service.listar(this.params, this.input).
                    then(datos => this.page = datos).
                    catch(error => this.mensajeError(error));

                this.cols = this.getColumnas();
            }
            //     this.getProfileForm(this.getInstance()); //TODO este no se deberia de llmar revisar estado crud view
        } catch (ex) {
            this.mensajeError('Error en el procesamiento, ' + ex['message'] + ', comuniquese con el administrador.');
        } finally {
            if (lazy === null || lazy === undefined || lazy === false) {
                this.loading = false;
            }
        }
    }

    abstract establecerValoresPorDefecto();

    // tslint:disable-next-line:use-lifecycle-interface
    abstract ngOnInit();

    filterChanged: Subject<LazyLoadEvent> = new Subject<LazyLoadEvent>();


    loadLazy(event: LazyLoadEvent) {
        //console.log("======= loadLazy: ", event);
        if (event.rows === 0) {
            this.input.page = 0;
        } else {
            this.input.page = event.first / event.rows;
        }

        this.input.size = event.rows;

        if (event.sortField !== null && event.sortField !== undefined) {
            event.sortField = this.sortColumna(event.sortField);
            // order 1 = asc, -1 = desc
            this.input.sort = new Sort(event.sortField, ((event.sortOrder === 1) ? 'ASC' : 'DESC'));
        }

        if (this.filtroPorDefecto === true) {
            this.establecerValoresPorDefecto();
            this.filtroPorDefecto = false;
        }

        this.setFiltroPorDefecto(event.filters);

        /*
        // inicio
        if (this.filterChanged.observers.length === 0) {
            this.filterChanged
                .pipe(debounceTime(1000), distinctUntilChanged())
                .subscribe(filterQuery => {
                    //this.loadData(filterQuery);
                    this.filters = this.camposFiltrar(event.filters);
                    this.filtrar(this.filters);
                });
        }
        this.filterChanged.next(event);
        // fin, si comenta esto, descomentar las 2 lineas de abajo..
        */

        this.filters = this.camposFiltrar(event.filters);
        this.filtrar(this.filters);
    }


    filtrar(parametros?: Map<string, string>) {
        //console.log("param: "+parametros);
        //console.log("page: " + JSON.stringify(this.page));
        if (parametros !== undefined && parametros !== null) {
            parametros.forEach((v, k, pmap) => {
                if (v !== null && v !== undefined) {
                    this.params.set(k, v);

                } else {
                    this.params.delete(k);
                }
            });
        }

        this.loading = true;
        //this.input.page = 0; // linea adicional
        this.service.listar(this.params, this.input)
            .then((datos) => {
                this.page = datos;
            })
            .catch((err) => (this.mensajeError(err)))
            .finally(() => {
                if (this.cols === null || this.cols === undefined) {
                    this.cols = this.getColumnas();
                }

                this.loading = false;
            });
    }

    async reload() {
        this.params.clear();
        await this.ngOnInit();
        this.filtrar(this.filters);
    }

    onChangeClearFilter(event, dropdown: Dropdown) {
        if (event.value === null || event.value === undefined) {
            dropdown.resetFilter();
        }
    }

    exportExcel() {
        try {
            const tempPagination = new Paginacion(1000, 0, this.input.sort);

            import('xlsx').then(async (xlsx) => {

                await this.service.listar(this.params, tempPagination)
                    .then(async (datos) => {
                        let temp = this.exportColumnas(datos.content);

                        const workbook = { Sheets: {}, SheetNames: [] };

                        let numeroPaginas = 1;

                        for (let index = 1; index < datos.totalPages; index++) {
                            tempPagination.page = tempPagination.page + 1;

                            await this.service.listar(this.params, tempPagination)
                                .then((data) => {
                                    temp = temp.concat(this.exportColumnas(data.content));

                                    if (tempPagination.page * tempPagination.size >= 1048575) {
                                        const worksheet = xlsx.utils.json_to_sheet(temp);
                                        xlsx.utils.book_append_sheet(
                                            workbook,
                                            worksheet,
                                            'pagina ' + numeroPaginas++
                                        );
                                        temp = [];
                                    }
                                })
                                .catch((err) => (this.mensajeError(err)));
                        }

                        if (temp.length > 0) {
                            const worksheet = xlsx.utils.json_to_sheet(temp);
                            xlsx.utils.book_append_sheet(
                                workbook,
                                worksheet,
                                'pagina ' + numeroPaginas++
                            );
                            const excelBuffer: any = xlsx.write(workbook, {
                                bookType: 'xlsx',
                                type: 'array',
                            });
                            this.saveAsExcelFile(excelBuffer, this.grupoEtiqueta);
                        } else {
                            this.mensajeInformacion('No hay datos exportar');
                        }
                    })
                    .catch((err) => (this.mensajeError(err)));
            });
        } catch (ex) {
            this.mensajeError(
                'Error en el procesamiento, ' +
                ex['message'] +
                ', comuniquese con el administrador.');
        }
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        /*import('file-saver').then((FileSaver) => {
            const EXCEL_TYPE =
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const EXCEL_EXTENSION = '.xlsx';
            const data: Blob = new Blob([buffer], {
                type: EXCEL_TYPE,
            });
            FileSaver.saveAs(
                data,
                fileName + '_' + new Date().getTime() + EXCEL_EXTENSION
            );
        });*/
        const EXCEL_TYPE =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
    }

    abstract getColumnas(): any[];

    abstract camposFiltrar(filters: any): Map<string, string>;

    abstract sortColumna(columna: string): string;

    abstract setFiltroPorDefecto(filters: any);

    abstract exportColumnas(data: any[]): any[];

}
