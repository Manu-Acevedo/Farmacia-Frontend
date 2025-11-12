import { environment } from '../../../environments/environment';

/**
 * Constantes de endpoints de la API
 */
export class ApiEndpoints {
  // Base URL
  static readonly BASE_URL = environment.apiUrl;

  // Auth endpoints
  static readonly AUTH = {
    LOGIN: `${ApiEndpoints.BASE_URL}/auth/login`,
    REGISTER: `${ApiEndpoints.BASE_URL}/auth/register`,
    LOGOUT: `${ApiEndpoints.BASE_URL}/auth/logout`,
    REFRESH: `${ApiEndpoints.BASE_URL}/auth/refresh`,
    ME: `${ApiEndpoints.BASE_URL}/auth/me`
  };

  // Usuarios endpoints
  static readonly USUARIOS = {
    BASE: `${ApiEndpoints.BASE_URL}/usuarios`,
    BY_ID: (id: string | number) => `${ApiEndpoints.BASE_URL}/usuarios/${id}`,
    SEARCH: `${ApiEndpoints.BASE_URL}/usuarios/search`
  };

  // Inventarios endpoints
  static readonly INVENTARIOS = {
    BASE: `${ApiEndpoints.BASE_URL}/inventarios`,
    BY_ID: (id: string | number) => `${ApiEndpoints.BASE_URL}/inventarios/${id}`,
    SEARCH: `${ApiEndpoints.BASE_URL}/inventarios/search`
  };

  // Productos endpoints
  static readonly PRODUCTOS = {
    BASE: `${ApiEndpoints.BASE_URL}/productos`,
    BY_ID: (id: string | number) => `${ApiEndpoints.BASE_URL}/productos/${id}`,
    SEARCH: `${ApiEndpoints.BASE_URL}/productos/search`,
    BY_CODIGO: (codigo: string) => `${ApiEndpoints.BASE_URL}/productos/codigo/${codigo}`
  };

  // Ventas endpoints
  static readonly VENTAS = {
    BASE: `${ApiEndpoints.BASE_URL}/ventas`,
    BY_ID: (id: string | number) => `${ApiEndpoints.BASE_URL}/ventas/${id}`,
    SEARCH: `${ApiEndpoints.BASE_URL}/ventas/search`,
    STATS: `${ApiEndpoints.BASE_URL}/ventas/stats`
  };

  // Reportes endpoints
  static readonly REPORTES = {
    BASE: `${ApiEndpoints.BASE_URL}/reportes`,
    GENERALES: `${ApiEndpoints.BASE_URL}/reportes/generales`,
    VENTAS: `${ApiEndpoints.BASE_URL}/reportes/ventas`,
    INVENTARIOS: `${ApiEndpoints.BASE_URL}/reportes/inventarios`,
    USUARIOS: `${ApiEndpoints.BASE_URL}/reportes/usuarios`
  };
}
