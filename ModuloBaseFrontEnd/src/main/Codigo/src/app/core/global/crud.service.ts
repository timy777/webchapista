import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@app/core/auth/login/service/auth.service';
import { IService } from '@app/core/global/iservice';
import { ServiceUtil } from '@app/core/global/service.util';
import { Paginacion } from '@app/core/global/paginacion';
import { Page } from '@app/core/global/page';

export class CrudService<I, T, P> implements IService<I, T, P> {

    public static CONTEXTO: string = null;
    protected http: HttpClient;
    protected authService: AuthService;
    protected uri: string;

    constructor(http: HttpClient, authService: AuthService, uri: string) {
        this.http = http;
        this.authService = authService;
        this.uri = uri;
    }

    public static async initializar(http: HttpClient) {
        if (CrudService.CONTEXTO === null) {
            const headers = new HttpHeaders()
                .set('Cache-Control', 'no-cache')
                .set('Pragma', 'no-cache');
            await http.get('assets/api.json', { headers }).toPromise().then(data => {
                CrudService.CONTEXTO = data.toString();
            }).catch(er => { console.log(er); });
        }
    }

    private getUrl(): string {
        return CrudService.CONTEXTO + this.uri;
    }

    public async obtener(id: P): Promise<T> {
        while (CrudService.CONTEXTO === null) {
            await CrudService.initializar(this.http);
        }
        return ServiceUtil.get<T>(this.http, this.authService, `${this.getUrl()}/${id}`);
    }

    public async listar(params?: Map<string, string>, input?: Paginacion): Promise<Page<T>> {
        while (CrudService.CONTEXTO === null) {
            await CrudService.initializar(this.http);
        }
        //console.log("URL: " + this.getUrl(), ", params: ", params, ", input: ", input)
        return ServiceUtil.list<Page<T>>(this.http, this.authService, this.getUrl(), params, input);
    }

    public async crear(input: I): Promise<T> {
        while (CrudService.CONTEXTO === null) {
            await CrudService.initializar(this.http);
        }

        return ServiceUtil.create<I, T>(this.http, this.authService, this.getUrl(), input);
    }

    public async actualizar(input: I, id: P): Promise<T> {
        while (CrudService.CONTEXTO === null) {
            await CrudService.initializar(this.http);
        }

        return ServiceUtil.update<I, T>(this.http, this.authService, `${this.getUrl()}/${id}`, input);
    }

    public async eliminar(id: P): Promise<{}> {
        while (CrudService.CONTEXTO === null) {
            await CrudService.initializar(this.http);
        }

        return ServiceUtil.delete(this.http, this.authService, `${this.getUrl()}/${id}`);
    }
}
