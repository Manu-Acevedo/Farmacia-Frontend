import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { HttpBase } from './http-base';
import { ApiEndpoints } from '../constants/api-endpoints';
import { AppConstants } from '../constants/app-constants';
import { ApiResponse } from '../models/api-response.interface';
import { User } from '../models/user.interface';

/**
 * Interface para credenciales de login
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Interface para respuesta de autenticación
 */
export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

/**
 * Servicio de autenticación
 */
@Injectable({
  providedIn: 'root',
})
export class Auth extends HttpBase {
  private currentUserSignal = signal<User | null>(null);
  private isAuthenticatedSignal = signal<boolean>(false);

  // Exponer señales como readonly
  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = this.isAuthenticatedSignal.asReadonly();

  constructor(private router: Router) {
    super();
    this.checkAuthState();
  }

  /**
   * Verifica el estado de autenticación al iniciar
   */
  private checkAuthState(): void {
    const token = this.getToken();
    const userData = localStorage.getItem(AppConstants.STORAGE_KEYS.USER);
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.currentUserSignal.set(user);
        this.isAuthenticatedSignal.set(true);
      } catch (error) {
        this.logout();
      }
    }
  }

  /**
   * Realiza el login
   */
  login(credentials: LoginCredentials): Observable<ApiResponse<AuthResponse>> {
    return this.post<ApiResponse<AuthResponse>>(ApiEndpoints.AUTH.LOGIN, credentials)
      .pipe(
        tap(response => {
          if (response.data) {
            this.setAuthData(response.data);
          }
        })
      );
  }

  /**
   * Realiza el registro
   */
  register(userData: any): Observable<ApiResponse<AuthResponse>> {
    return this.post<ApiResponse<AuthResponse>>(ApiEndpoints.AUTH.REGISTER, userData)
      .pipe(
        tap(response => {
          if (response.data) {
            this.setAuthData(response.data);
          }
        })
      );
  }

  /**
   * Cierra la sesión
   */
  logout(): void {
    // Llamar al endpoint de logout si existe
    this.post(ApiEndpoints.AUTH.LOGOUT, {}).subscribe({
      next: () => this.clearAuthData(),
      error: () => this.clearAuthData()
    });
  }

  /**
   * Refresca el token
   */
  refreshToken(): Observable<ApiResponse<AuthResponse>> {
    const refreshToken = localStorage.getItem(AppConstants.STORAGE_KEYS.REFRESH_TOKEN);
    return this.post<ApiResponse<AuthResponse>>(ApiEndpoints.AUTH.REFRESH, { refreshToken })
      .pipe(
        tap(response => {
          if (response.data) {
            this.setAuthData(response.data);
          }
        })
      );
  }

  /**
   * Obtiene el perfil del usuario actual
   */
  getCurrentUser(): Observable<ApiResponse<User>> {
    return this.get<ApiResponse<User>>(ApiEndpoints.AUTH.ME)
      .pipe(
        tap(response => {
          if (response.data) {
            this.currentUserSignal.set(response.data);
            localStorage.setItem(AppConstants.STORAGE_KEYS.USER, JSON.stringify(response.data));
          }
        })
      );
  }

  /**
   * Guarda los datos de autenticación
   */
  private setAuthData(authData: AuthResponse): void {
    localStorage.setItem(AppConstants.STORAGE_KEYS.TOKEN, authData.token);
    if (authData.refreshToken) {
      localStorage.setItem(AppConstants.STORAGE_KEYS.REFRESH_TOKEN, authData.refreshToken);
    }
    localStorage.setItem(AppConstants.STORAGE_KEYS.USER, JSON.stringify(authData.user));
    
    this.currentUserSignal.set(authData.user);
    this.isAuthenticatedSignal.set(true);
  }

  /**
   * Limpia los datos de autenticación
   */
  private clearAuthData(): void {
    localStorage.removeItem(AppConstants.STORAGE_KEYS.TOKEN);
    localStorage.removeItem(AppConstants.STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(AppConstants.STORAGE_KEYS.USER);
    
    this.currentUserSignal.set(null);
    this.isAuthenticatedSignal.set(false);
    
    this.router.navigate(['/auth/login']);
  }

  /**
   * Obtiene el token de autenticación
   */
  getToken(): string | null {
    return localStorage.getItem(AppConstants.STORAGE_KEYS.TOKEN);
  }

  /**
   * Verifica si el usuario tiene un rol específico
   */
  hasRole(role: string): boolean {
    const user = this.currentUserSignal();
    return user?.role === role || false;
  }

  /**
   * Verifica si el usuario tiene alguno de los roles especificados
   */
  hasAnyRole(roles: string[]): boolean {
    const user = this.currentUserSignal();
    return user ? roles.includes(user.role) : false;
  }
}

