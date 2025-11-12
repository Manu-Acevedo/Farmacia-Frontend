import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Opciones para las peticiones HTTP
 */
export interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
  reportProgress?: boolean;
  withCredentials?: boolean;
}

/**
 * Servicio base para peticiones HTTP
 * Proporciona métodos comunes para interactuar con la API
 */
@Injectable({
  providedIn: 'root',
})
export class HttpBase {
  protected readonly http = inject(HttpClient);
  protected readonly baseUrl = environment.apiUrl;

  /**
   * Realiza una petición GET
   */
  protected get<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.http.get<T>(url, options);
  }

  /**
   * Realiza una petición POST
   */
  protected post<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    return this.http.post<T>(url, body, options);
  }

  /**
   * Realiza una petición PUT
   */
  protected put<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    return this.http.put<T>(url, body, options);
  }

  /**
   * Realiza una petición PATCH
   */
  protected patch<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    return this.http.patch<T>(url, body, options);
  }

  /**
   * Realiza una petición DELETE
   */
  protected delete<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.http.delete<T>(url, options);
  }

  /**
   * Construye parámetros HTTP desde un objeto
   */
  protected buildParams(params: { [key: string]: any }): HttpParams {
    let httpParams = new HttpParams();
    
    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== null && value !== undefined) {
        httpParams = httpParams.append(key, value.toString());
      }
    });
    
    return httpParams;
  }

  /**
   * Construye headers HTTP personalizados
   */
  protected buildHeaders(headers: { [key: string]: string }): HttpHeaders {
    let httpHeaders = new HttpHeaders();
    
    Object.keys(headers).forEach(key => {
      httpHeaders = httpHeaders.append(key, headers[key]);
    });
    
    return httpHeaders;
  }
}
