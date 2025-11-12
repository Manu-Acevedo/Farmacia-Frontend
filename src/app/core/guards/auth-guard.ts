import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

/**
 * Guard de autenticación
 * Verifica si el usuario está autenticado antes de acceder a una ruta
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
  
  // Verificar si el usuario está autenticado
  if (authService.isAuthenticated()) {
    // Verificar roles si están especificados en la ruta
    const requiredRoles = route.data['roles'] as string[];
    
    if (requiredRoles && requiredRoles.length > 0) {
      // Verificar si el usuario tiene alguno de los roles requeridos
      if (authService.hasAnyRole(requiredRoles)) {
        return true;
      } else {
        // Usuario no tiene los roles necesarios
        console.warn('Usuario sin permisos suficientes');
        router.navigate(['/dashboard']);
        return false;
      }
    }
    
    // Usuario autenticado y sin restricción de roles
    return true;
  }
  
  // Usuario no autenticado, redirigir al login
  console.warn('Usuario no autenticado, redirigiendo al login');
  router.navigate(['/auth/login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};

