import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AppConstants } from '../constants/app-constants';

/**
 * Interceptor de errores HTTP
 * Maneja errores globales de las peticiones HTTP
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';
      
      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Error: ${error.error.message}`;
        console.error('Error del cliente:', error.error.message);
      } else {
        // Error del lado del servidor
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        console.error(`Error del servidor: ${error.status}`, error.error);
        
        // Manejar errores específicos
        switch (error.status) {
          case 401:
            // No autorizado - redirigir al login
            console.warn('Sesión expirada o no autorizada');
            localStorage.removeItem(AppConstants.STORAGE_KEYS.TOKEN);
            localStorage.removeItem(AppConstants.STORAGE_KEYS.USER);
            router.navigate(['/auth/login']);
            errorMessage = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
            break;
            
          case 403:
            // Prohibido - sin permisos
            console.warn('Acceso prohibido');
            errorMessage = 'No tienes permisos para realizar esta acción.';
            break;
            
          case 404:
            // No encontrado
            console.warn('Recurso no encontrado');
            errorMessage = 'El recurso solicitado no fue encontrado.';
            break;
            
          case 500:
            // Error interno del servidor
            console.error('Error interno del servidor');
            errorMessage = 'Error interno del servidor. Por favor, intenta más tarde.';
            break;
            
          case 0:
            // Sin conexión
            console.error('Sin conexión al servidor');
            errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
            break;
            
          default:
            // Otros errores
            errorMessage = error.error?.message || 'Ha ocurrido un error inesperado.';
        }
      }
      
      // Retornar el error para que el componente pueda manejarlo
      return throwError(() => ({
        message: errorMessage,
        status: error.status,
        error: error.error
      }));
    })
  );
};

