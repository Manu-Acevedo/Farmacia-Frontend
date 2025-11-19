import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppConstants } from '../constants/app-constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Obtener el token del localStorage
  const token = localStorage.getItem(AppConstants.STORAGE_KEYS.TOKEN);
  
  // Si existe el token, clonar la request y agregar el header de autorización
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }
  
  // Si no hay token, continuar con la request original
  return next(req);
};

