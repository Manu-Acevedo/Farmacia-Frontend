/**
 * Interface para el producto
 */
export interface Producto {
  id: string | number;
  codigo: string;
  nombre: string;
  descripcion?: string;
  categoria: string;
  precio: number;
  precioCompra?: number;
  stock: number;
  stockMinimo: number;
  unidadMedida: string;
  proveedor?: string;
  lote?: string;
  fechaVencimiento?: string;
  activo?: boolean;
  imagenUrl?: string;
  fechaCreacion?: string;
  fechaActualizacion?: string;
}
