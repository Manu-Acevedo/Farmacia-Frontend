# Configuración de Conexión al Backend

## URL de la API

La aplicación está configurada para conectarse al backend en:

```
http://localhost:8080/api/v1
```

## Archivos de Configuración

### 1. Environments (`src/environments/`)

- **environment.ts**: Configuración de producción
- **environment.development.ts**: Configuración de desarrollo

Ambos archivos contienen:

```typescript
export const environment = {
  production: boolean,
  apiUrl: 'http://localhost:8080/api/v1',
};
```

### 2. API Endpoints (`src/app/core/constants/api-endpoints.ts`)

Define todos los endpoints disponibles:

- **AUTH**: Login, registro, logout, refresh token
- **USUARIOS**: CRUD de usuarios
- **INVENTARIOS**: Gestión de inventarios
- **PRODUCTOS**: Gestión de productos
- **VENTAS**: Gestión de ventas
- **REPORTES**: Reportes generales

### 3. Constantes de Aplicación (`src/app/core/constants/app-constants.ts`)

Contiene:

- Configuración de timeout y reintentos
- Opciones de paginación
- Claves de almacenamiento local
- Formatos de fecha y moneda
- Mensajes del sistema
- Roles de usuario

## Servicios

### HttpBase (`src/app/core/services/http-base.ts`)

Servicio base que proporciona métodos HTTP:

- `get<T>(url, options)`
- `post<T>(url, body, options)`
- `put<T>(url, body, options)`
- `patch<T>(url, body, options)`
- `delete<T>(url, options)`
- `buildParams(params)`: Construye parámetros HTTP
- `buildHeaders(headers)`: Construye headers personalizados

### Api Service (`src/app/core/services/api.ts`)

Servicio genérico que extiende HttpBase:

- `getList<T>(endpoint, params)`: Obtiene lista de recursos
- `getById<T>(endpoint, id)`: Obtiene recurso por ID
- `create<T>(endpoint, data)`: Crea nuevo recurso
- `update<T>(endpoint, id, data)`: Actualiza recurso
- `partialUpdate<T>(endpoint, id, data)`: Actualización parcial
- `remove<T>(endpoint, id)`: Elimina recurso
- `search<T>(endpoint, searchParams)`: Busca con filtros

### Auth Service (`src/app/core/services/auth.ts`)

Servicio de autenticación:

- `login(credentials)`: Inicia sesión
- `register(userData)`: Registra nuevo usuario
- `logout()`: Cierra sesión
- `refreshToken()`: Refresca el token
- `getCurrentUser()`: Obtiene perfil del usuario
- `getToken()`: Obtiene token de autenticación
- `hasRole(role)`: Verifica rol del usuario
- `hasAnyRole(roles)`: Verifica múltiples roles

## Interceptores

### Auth Interceptor (`src/app/core/interceptors/auth-interceptor.ts`)

Agrega automáticamente el token JWT a todas las peticiones HTTP:

```typescript
Authorization: Bearer<token>;
```

### Error Interceptor (`src/app/core/interceptors/error-interceptor.ts`)

Maneja errores HTTP globalmente:

- **401 Unauthorized**: Redirige al login
- **403 Forbidden**: Muestra mensaje de permisos
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Error del servidor
- **0 Network Error**: Sin conexión

## Modelos de Datos

### ApiResponse<T> (`src/app/core/models/api-response.interface.ts`)

```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
  timestamp?: string;
}
```

### User (`src/app/core/models/user.interface.ts`)

```typescript
interface User {
  id: string | number;
  username: string;
  email: string;
  nombre: string;
  apellido: string;
  role: string;
  activo?: boolean;
  fechaCreacion?: string;
  fechaActualizacion?: string;
}
```

## Uso en Componentes

### Ejemplo: Usar el servicio Auth

```typescript
import { Component, inject } from '@angular/core';
import { Auth } from '@core/services/auth';

export class LoginComponent {
  private authService = inject(Auth);

  login() {
    this.authService
      .login({
        username: 'usuario',
        password: 'contraseña',
      })
      .subscribe({
        next: (response) => {
          console.log('Login exitoso', response);
        },
        error: (error) => {
          console.error('Error en login', error);
        },
      });
  }
}
```

### Ejemplo: Usar el servicio Api genérico

```typescript
import { Component, inject } from '@angular/core';
import { Api } from '@core/services/api';
import { ApiEndpoints } from '@core/constants/api-endpoints';

export class UsuariosListComponent {
  private apiService = inject(Api);

  loadUsuarios() {
    this.apiService
      .getList(ApiEndpoints.USUARIOS.BASE, {
        page: 0,
        size: 10,
      })
      .subscribe({
        next: (response) => {
          console.log('Usuarios:', response.data);
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
  }
}
```

### Ejemplo: Crear servicio específico

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBase } from '@core/services/http-base';
import { ApiEndpoints } from '@core/constants/api-endpoints';
import { ApiResponse } from '@core/models/api-response.interface';
import { Producto } from '../models/producto.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductoService extends HttpBase {
  getProductos(params?: any): Observable<ApiResponse<Producto[]>> {
    const httpParams = params ? this.buildParams(params) : undefined;
    return this.get<ApiResponse<Producto[]>>(ApiEndpoints.PRODUCTOS.BASE, { params: httpParams });
  }

  getProductoByCodigo(codigo: string): Observable<ApiResponse<Producto>> {
    return this.get<ApiResponse<Producto>>(ApiEndpoints.PRODUCTOS.BY_CODIGO(codigo));
  }

  createProducto(producto: Producto): Observable<ApiResponse<Producto>> {
    return this.post<ApiResponse<Producto>>(ApiEndpoints.PRODUCTOS.BASE, producto);
  }
}
```

## Almacenamiento Local

El sistema utiliza localStorage para guardar:

- **auth_token**: Token JWT de autenticación
- **refresh_token**: Token de renovación
- **user_data**: Datos del usuario actual
- **app_theme**: Tema de la aplicación
- **app_language**: Idioma de la aplicación

## Cambiar la URL del Backend

Para cambiar la URL del backend, modifica los archivos:

1. `src/environments/environment.ts`
2. `src/environments/environment.development.ts`

Cambia el valor de `apiUrl`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://tu-servidor.com/api/v1', // Nueva URL
};
```

## Notas Importantes

1. **CORS**: Asegúrate de que el backend tenga configurado CORS para permitir peticiones desde el frontend.

2. **Tokens**: Los tokens se almacenan en localStorage y se envían automáticamente en cada petición.

3. **Manejo de Errores**: Los errores HTTP son manejados globalmente por el error interceptor.

4. **Autenticación**: El auth interceptor agrega automáticamente el header de autorización a todas las peticiones.

5. **Respuestas de la API**: Se espera que todas las respuestas del backend sigan el formato `ApiResponse<T>`.
