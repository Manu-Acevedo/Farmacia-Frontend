import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBase } from './http-base';
import { ApiEndpoints } from '../constants/api-endpoints';
import { ApiResponse } from '../models/api-response.interface';

/**
 * Servicio genérico para interactuar con la API
 */
@Injectable({
  providedIn: 'root',
})
export class Api extends HttpBase {
  
  /**
   * Obtiene una lista de recursos
   */
  getList<T>(endpoint: string, params?: any): Observable<ApiResponse<T[]>> {
    const httpParams = params ? this.buildParams(params) : undefined;
    return this.get<ApiResponse<T[]>>(endpoint, { params: httpParams });
  }

  /**
   * Obtiene un recurso por ID
   */
  getById<T>(endpoint: string, id: string | number): Observable<ApiResponse<T>> {
    return this.get<ApiResponse<T>>(`${endpoint}/${id}`);
  }

  /**
   * Crea un nuevo recurso
   */
  create<T>(endpoint: string, data: any): Observable<ApiResponse<T>> {
    return this.post<ApiResponse<T>>(endpoint, data);
  }

  /**
   * Actualiza un recurso existente
   */
  update<T>(endpoint: string, id: string | number, data: any): Observable<ApiResponse<T>> {
    return this.put<ApiResponse<T>>(`${endpoint}/${id}`, data);
  }

  /**
   * Actualiza parcialmente un recurso
   */
  partialUpdate<T>(endpoint: string, id: string | number, data: any): Observable<ApiResponse<T>> {
    return this.patch<ApiResponse<T>>(`${endpoint}/${id}`, data);
  }

  /**
   * Elimina un recurso
   */
  remove<T>(endpoint: string, id: string | number): Observable<ApiResponse<T>> {
    return this.delete<ApiResponse<T>>(`${endpoint}/${id}`);
  }

  /**
   * Busca recursos con filtros
   */
  search<T>(endpoint: string, searchParams: any): Observable<ApiResponse<T[]>> {
    const httpParams = this.buildParams(searchParams);
    return this.get<ApiResponse<T[]>>(`${endpoint}/search`, { params: httpParams });
  }
}

