# 🚀 Guía de Inicio Rápido - Farmacia Frontend

## ✅ Configuración Completada

Tu aplicación Angular ha sido configurada exitosamente para conectarse al backend en:

```
http://localhost:8080/api/v1
```

## 📦 Instalación y Ejecución

### 1. Instalar dependencias (si no lo has hecho)

```powershell
npm install
```

### 2. Ejecutar en modo desarrollo

```powershell
npm start
```

o

```powershell
ng serve
```

La aplicación estará disponible en: `http://localhost:4200`

### 3. Compilar para producción

```powershell
npm run build
```

o

```powershell
ng build
```

## 🔧 Verificar la Conexión con el Backend

### Paso 1: Asegúrate que el backend esté corriendo

El backend debe estar ejecutándose en `http://localhost:8080`

### Paso 2: Verificar CORS en el backend

El backend debe permitir peticiones desde `http://localhost:4200`

Ejemplo de configuración CORS en Spring Boot:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:4200")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

## 📂 Archivos Importantes

### Configuración

- `src/environments/environment.ts` - Configuración de producción
- `src/environments/environment.development.ts` - Configuración de desarrollo
- `src/app/app.config.ts` - Configuración principal de la app

### Servicios Core

- `src/app/core/services/auth.ts` - Autenticación
- `src/app/core/services/api.ts` - Servicio genérico de API
- `src/app/core/services/http-base.ts` - Servicio base HTTP

### Interceptores

- `src/app/core/interceptors/auth-interceptor.ts` - Agrega token JWT
- `src/app/core/interceptors/error-interceptor.ts` - Manejo de errores

### Constantes

- `src/app/core/constants/api-endpoints.ts` - Todos los endpoints
- `src/app/core/constants/app-constants.ts` - Constantes generales

### Guards

- `src/app/core/guards/auth-guard.ts` - Protección de rutas

## 🎯 Próximos Pasos

### 1. Implementar el Login

Crea el componente de login en `src/app/features/auth/pages/login/`:

```typescript
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@core/services/auth';

export class LoginComponent {
  private authService = inject(Auth);
  private router = inject(Router);

  credentials = {
    username: '',
    password: '',
  };

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login exitoso');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error de login:', error);
      },
    });
  }
}
```

### 2. Proteger Rutas

En `src/app/app.routes.ts`, protege las rutas con el guard:

```typescript
import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes'),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard], // 👈 Proteger con guard
    loadChildren: () => import('./features/dashboard/dashboard.routes'),
  },
  // ... más rutas
];
```

### 3. Crear Servicios Específicos

Usa `InventarioService` como ejemplo para crear más servicios:

```
src/app/features/[módulo]/services/[nombre].service.ts
```

### 4. Usar el Servicio en Componentes

Ver ejemplo completo en:

```
src/app/features/inventarios/components/productos-example.component.ts
```

## 📚 Documentación Detallada

- **BACKEND_CONFIGURATION.md** - Documentación completa de la configuración
- **SETUP_SUMMARY.md** - Resumen ejecutivo de lo implementado
- **app.routes.example.ts** - Ejemplos de configuración de rutas
- **productos-example.component.ts** - Ejemplo completo de componente

## 🧪 Probar la Conexión

### Test 1: Verificar que el backend responde

Abre la consola del navegador (F12) y ejecuta:

```javascript
fetch('http://localhost:8080/api/v1/health')
  .then((r) => r.json())
  .then(console.log);
```

### Test 2: Probar el login desde la aplicación

1. Corre `npm start`
2. Navega a `/auth/login`
3. Ingresa credenciales válidas
4. Verifica en la consola que el token se guarda

## 🔍 Debugging

### Ver peticiones HTTP

Abre las DevTools del navegador:

- **Network Tab**: Ver todas las peticiones HTTP
- **Console**: Ver logs de errores

### Ver el token guardado

```javascript
// En la consola del navegador
localStorage.getItem('auth_token');
```

### Ver el usuario actual

```javascript
// En la consola del navegador
JSON.parse(localStorage.getItem('user_data'));
```

## ⚠️ Problemas Comunes

### Error: "CORS policy"

**Solución**: Configurar CORS en el backend

### Error: "401 Unauthorized"

**Solución**: Verificar que el token sea válido y no haya expirado

### Error: "Cannot connect to backend"

**Solución**:

1. Verificar que el backend esté corriendo
2. Verificar la URL en `environment.ts`
3. Verificar el firewall/antivirus

### Error: "Module not found @core"

**Solución**: Reiniciar el servidor de desarrollo (`ng serve`)

## 📞 Path Aliases

Usa estos aliases en tus imports:

```typescript
import { Auth } from '@core/services/auth';
import { ApiEndpoints } from '@core/constants/api-endpoints';
import { Producto } from '@features/inventarios/models/producto.interface';
import { environment } from '@environments/environment';
```

## 🛠️ Comandos Útiles

```powershell
# Desarrollo
npm start                    # Iniciar servidor de desarrollo
ng serve --open             # Iniciar y abrir en navegador
ng serve --port 4201        # Iniciar en puerto específico

# Compilación
ng build                    # Build de desarrollo
ng build --configuration production  # Build de producción

# Generación de código
ng generate component features/nombre/pages/mi-componente
ng generate service features/nombre/services/mi-servicio

# Testing
ng test                     # Ejecutar tests unitarios
ng e2e                      # Ejecutar tests e2e

# Linting
ng lint                     # Verificar código
```

## ✨ Arquitectura del Proyecto

```
src/app/
├── core/                   # Funcionalidad central
│   ├── constants/          # Constantes y endpoints
│   ├── guards/             # Guards de rutas
│   ├── interceptors/       # Interceptores HTTP
│   ├── models/             # Interfaces compartidas
│   └── services/           # Servicios core
│
├── features/               # Módulos de funcionalidad
│   ├── auth/               # Autenticación
│   ├── dashboard/          # Dashboard
│   ├── inventarios/        # Gestión de inventarios
│   ├── usuarios/           # Gestión de usuarios
│   ├── ventas/             # Gestión de ventas
│   └── reportes-generales/ # Reportes
│
├── shared/                 # Componentes compartidos
│   ├── components/         # Componentes reutilizables
│   ├── directives/         # Directivas
│   └── pipes/              # Pipes
│
└── environments/           # Configuraciones de entorno
```

## 🎓 Recursos de Aprendizaje

- [Documentación de Angular](https://angular.dev)
- [RxJS - Observables](https://rxjs.dev)
- [Angular Signals](https://angular.dev/guide/signals)
- [TypeScript](https://www.typescriptlang.org/)

## 📝 Notas Finales

- ✅ Todos los servicios usan TypeScript estricto
- ✅ Los interceptores están configurados globalmente
- ✅ El manejo de errores es automático
- ✅ Los tokens se manejan automáticamente
- ✅ La aplicación compila sin errores

**¡Tu aplicación está lista para conectarse al backend!** 🎉
