/*import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // La URL de la API que deseas consumir
  private apiUrl = 'https://10.19.11.141:8443/GatewayNg/assets/api.json';

  constructor(private http: HttpClient) { }

  // Método para realizar una solicitud HTTP GET a la API
  getApiData(): Observable<any> {
    // Agregar encabezados para evitar el almacenamiento en caché
    const headers = new HttpHeaders()
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache');

    // Realizar la solicitud HTTP GET y retornar la respuesta como un Observable
    return this.http.get(this.apiUrl, { headers });
  }
}*/
