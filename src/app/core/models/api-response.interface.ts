/**
 * Interface genérica para respuestas de la API
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
  timestamp?: string;
}

/**
 * Interface para respuestas paginadas
 */
export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
  };
}
