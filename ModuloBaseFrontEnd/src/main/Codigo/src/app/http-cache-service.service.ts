import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpCacheService {
  constructor(private http: HttpClient) {}

  // Función para realizar una solicitud HTTP sin caché
  getWithoutCache(url: string) {
    const headers = new HttpHeaders({ 'Cache-Control': 'no-cache' });
    return this.http.get(url, { headers });
  }
}
