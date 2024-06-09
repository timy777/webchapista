import { AuthService } from '@app/core/auth/login/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

export class HttpResponseUtil {

    public static handleErrorGeneric(response: HttpErrorResponse, authService: AuthService): Promise<string> {
        console.log("*** handleErrorGeneric response: ", JSON.stringify(response));

        let errorMessage = '';

        if (response.status === 0 || response.status >= 500) {
            errorMessage =
                `Mensaje(s): Error en la conexion con el servidor, comuniquese con el administrador.`;
            return Promise.reject(errorMessage);
        }

        if (response.status === 401) {
            console.log(" response session expirada ")
            authService.sessionExpirada();
            errorMessage = `Mensaje(s): Session expirado por Token expirado.`;
            return Promise.reject(errorMessage);
        }

        if (response.status === 403) {
            console.log(" response session no autorizado", response)
            
            let url = response.url;
            if(response.url.includes('?')) {
                url = response.url.substring(0, response.url.indexOf('?'))
            }
            let urlNoAccedido = url.split('/');
            errorMessage = `Mensaje(s): No tiene acceso al recurso.` ;
            if(urlNoAccedido.length > 3){
                errorMessage = `Mensaje(s): No tiene acceso al recurso de ${urlNoAccedido[urlNoAccedido.length-1].toLocaleUpperCase()} .`;
            }
            //console.log(" response session no autorizado")                        
            authService.noAutorizado();
            return Promise.reject(errorMessage);
        }

        if (response.status === 404) {
            if (response.error.errores === undefined) {
                errorMessage = `Mensaje(s): Error en la conexion con el servidor, comuniquese con el administrador.`;
                return Promise.reject(errorMessage);
            }
        }

        if (response instanceof ErrorEvent) {
            // Get client-side error
            // OAC COMENTO
            //errorMessage = response.error.message;
        } else {
            console.log("**** Error " + JSON.stringify(response));
            if (JSON.stringify(response).includes("Timeout has occurred")) {
                errorMessage = `Mensaje(s): Error ${response.message}.`;
            } else {
                // Get server-side error
                //console.log("*** handleErrorGeneric mensaje: ", `${response.error.mensaje}`)
                //if( response.error != undefined && response.error.errores != undefined)
                errorMessage = `Mensaje(s): ${response.error.errores.join('. ')}`;
                //else 
                //    console.log("Error " + JSON.stringify(response));
            }
        }
        console.log("*** handleErrorGeneric errorMessage: ", JSON.stringify(errorMessage))
        return Promise.reject(errorMessage);
    }

}