/**
 * Constantes de la aplicación
 */
export class AppConstants {
  // Configuración de la API
  static readonly API_TIMEOUT = 30000; // 30 segundos
  static readonly API_RETRY_ATTEMPTS = 3;

  // Paginación
  static readonly DEFAULT_PAGE_SIZE = 10;
  static readonly PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

  // Storage keys
  static readonly STORAGE_KEYS = {
    TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    USER: 'user_data',
    THEME: 'app_theme',
    LANGUAGE: 'app_language'
  };

  // Formatos
  static readonly DATE_FORMAT = 'dd/MM/yyyy';
  static readonly DATE_TIME_FORMAT = 'dd/MM/yyyy HH:mm:ss';
  static readonly CURRENCY_FORMAT = 'es-MX';

  // Mensajes
  static readonly MESSAGES = {
    SUCCESS: {
      SAVE: 'Registro guardado exitosamente',
      UPDATE: 'Registro actualizado exitosamente',
      DELETE: 'Registro eliminado exitosamente',
      LOGIN: 'Inicio de sesión exitoso',
      LOGOUT: 'Sesión cerrada exitosamente'
    },
    ERROR: {
      GENERIC: 'Ha ocurrido un error, por favor intenta nuevamente',
      NETWORK: 'Error de conexión con el servidor',
      UNAUTHORIZED: 'No autorizado, por favor inicia sesión',
      NOT_FOUND: 'Recurso no encontrado',
      VALIDATION: 'Por favor verifica los datos ingresados'
    }
  };

  // Roles de usuario
  static readonly ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    VIEWER: 'VIEWER'
  };
}
