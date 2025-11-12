/**
 * Interface para el usuario
 */
export interface User {
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
