import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBase } from '@core/services/http-base';
import { ApiEndpoints } from '@core/constants/api-endpoints';
import { ApiResponse, PaginatedApiResponse } from '@core/models/api-response.interface';
import { Inventario } from '../models/inventario.interface';
import { Producto } from '../models/producto.interface';

/**
 * Servicio para gestionar inventarios
 */
@Injectable({
  providedIn: 'root',
})
export class InventarioService extends HttpBase {
  
  /**
   * Obtiene la lista de inventarios con paginación
   */
  getInventarios(params?: {
    page?: number;
    size?: number;
    search?: string;
  }): Observable<PaginatedApiResponse<Inventario>> {
    const httpParams = params ? this.buildParams(params) : undefined;
    return this.get<PaginatedApiResponse<Inventario>>(
      ApiEndpoints.INVENTARIOS.BASE,
      { params: httpParams }
    );
  }

  /**
   * Obtiene un inventario por ID
   */
  getInventarioById(id: string | number): Observable<ApiResponse<Inventario>> {
    return this.get<ApiResponse<Inventario>>(
      ApiEndpoints.INVENTARIOS.BY_ID(id)
    );
  }

  /**
   * Crea un nuevo inventario
   */
  createInventario(inventario: Partial<Inventario>): Observable<ApiResponse<Inventario>> {
    return this.post<ApiResponse<Inventario>>(
      ApiEndpoints.INVENTARIOS.BASE,
      inventario
    );
  }

  /**
   * Actualiza un inventario existente
   */
  updateInventario(
    id: string | number,
    inventario: Partial<Inventario>
  ): Observable<ApiResponse<Inventario>> {
    return this.put<ApiResponse<Inventario>>(
      ApiEndpoints.INVENTARIOS.BY_ID(id),
      inventario
    );
  }

  /**
   * Elimina un inventario
   */
  deleteInventario(id: string | number): Observable<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(
      ApiEndpoints.INVENTARIOS.BY_ID(id)
    );
  }

  /**
   * Busca inventarios con filtros específicos
   */
  searchInventarios(searchParams: {
    nombre?: string;
    categoria?: string;
    minStock?: number;
    maxStock?: number;
  }): Observable<ApiResponse<Inventario[]>> {
    const httpParams = this.buildParams(searchParams);
    return this.get<ApiResponse<Inventario[]>>(
      ApiEndpoints.INVENTARIOS.SEARCH,
      { params: httpParams }
    );
  }

  // ===== Métodos para Productos =====

  /**
   * Obtiene la lista de productos con paginación
   */
  getProductos(params?: {
    page?: number;
    size?: number;
    search?: string;
  }): Observable<PaginatedApiResponse<Producto>> {
    const httpParams = params ? this.buildParams(params) : undefined;
    return this.get<PaginatedApiResponse<Producto>>(
      ApiEndpoints.PRODUCTOS.BASE,
      { params: httpParams }
    );
  }

  /**
   * Obtiene un producto por ID
   */
  getProductoById(id: string | number): Observable<ApiResponse<Producto>> {
    return this.get<ApiResponse<Producto>>(
      ApiEndpoints.PRODUCTOS.BY_ID(id)
    );
  }

  /**
   * Obtiene un producto por código
   */
  getProductoByCodigo(codigo: string): Observable<ApiResponse<Producto>> {
    return this.get<ApiResponse<Producto>>(
      ApiEndpoints.PRODUCTOS.BY_CODIGO(codigo)
    );
  }

  /**
   * Crea un nuevo producto
   */
  createProducto(producto: Partial<Producto>): Observable<ApiResponse<Producto>> {
    return this.post<ApiResponse<Producto>>(
      ApiEndpoints.PRODUCTOS.BASE,
      producto
    );
  }

  /**
   * Actualiza un producto existente
   */
  updateProducto(
    id: string | number,
    producto: Partial<Producto>
  ): Observable<ApiResponse<Producto>> {
    return this.put<ApiResponse<Producto>>(
      ApiEndpoints.PRODUCTOS.BY_ID(id),
      producto
    );
  }

  /**
   * Elimina un producto
   */
  deleteProducto(id: string | number): Observable<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(
      ApiEndpoints.PRODUCTOS.BY_ID(id)
    );
  }
}
