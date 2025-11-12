/**
 * Interface para el inventario
 */
export interface Inventario {
  id: string | number;
  nombre: string;
  descripcion?: string;
  categoria: string;
  cantidad: number;
  stockMinimo: number;
  stockMaximo: number;
  ubicacion?: string;
  fechaCreacion?: string;
  fechaActualizacion?: string;
  activo?: boolean;
}
