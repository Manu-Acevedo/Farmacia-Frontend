import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBase } from './http-base';
import { ApiEndpoints } from '../constants/api-endpoints';
import { ApiResponse } from '../models/api-response.interface';


@Injectable({
  providedIn: 'root',
})
export class Api extends HttpBase {
  
  getList<T>(endpoint: string, params?: any): Observable<ApiResponse<T[]>> {
    const httpParams = params ? this.buildParams(params) : undefined;
    return this.get<ApiResponse<T[]>>(endpoint, { params: httpParams });
  }

  
  getById<T>(endpoint: string, id: string | number): Observable<ApiResponse<T>> {
    return this.get<ApiResponse<T>>(`${endpoint}/${id}`);
  }

  create<T>(endpoint: string, data: any): Observable<ApiResponse<T>> {
    return this.post<ApiResponse<T>>(endpoint, data);
  }

 
  update<T>(endpoint: string, id: string | number, data: any): Observable<ApiResponse<T>> {
    return this.put<ApiResponse<T>>(`${endpoint}/${id}`, data);
  }


  partialUpdate<T>(endpoint: string, id: string | number, data: any): Observable<ApiResponse<T>> {
    return this.patch<ApiResponse<T>>(`${endpoint}/${id}`, data);
  }


  remove<T>(endpoint: string, id: string | number): Observable<ApiResponse<T>> {
    return this.delete<ApiResponse<T>>(`${endpoint}/${id}`);
  }

 
  search<T>(endpoint: string, searchParams: any): Observable<ApiResponse<T[]>> {
    const httpParams = this.buildParams(searchParams);
    return this.get<ApiResponse<T[]>>(`${endpoint}/search`, { params: httpParams });
  }
}

