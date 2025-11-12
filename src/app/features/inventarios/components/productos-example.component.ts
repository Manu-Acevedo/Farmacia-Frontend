/**
 * EJEMPLO COMPLETO: Componente que consume la API del Backend
 * 
 * Este archivo muestra cómo crear un componente completo que:
 * - Lista datos del backend
 * - Crea nuevos registros
 * - Actualiza registros existentes
 * - Elimina registros
 * - Maneja errores
 * - Muestra estados de carga
 */

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InventarioService } from '../services/inventario.service';
import { Producto } from '../models/producto.interface';
import { AppConstants } from '@core/constants/app-constants';

@Component({
  selector: 'app-productos-example',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Gestión de Productos</h1>
      
      <!-- Estado de carga -->
      <div *ngIf="isLoading()" class="loading">
        Cargando productos...
      </div>
      
      <!-- Mensajes de error -->
      <div *ngIf="errorMessage()" class="error">
        {{ errorMessage() }}
      </div>
      
      <!-- Mensajes de éxito -->
      <div *ngIf="successMessage()" class="success">
        {{ successMessage() }}
      </div>
      
      <!-- Lista de productos -->
      <div *ngIf="!isLoading() && productos().length > 0">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let producto of productos()">
              <td>{{ producto.codigo }}</td>
              <td>{{ producto.nombre }}</td>
              <td>{{ producto.precio | currency:'MXN' }}</td>
              <td>{{ producto.stock }}</td>
              <td>
                <button (click)="editarProducto(producto)">Editar</button>
                <button (click)="eliminarProducto(producto.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Paginación -->
        <div class="pagination" *ngIf="totalPages() > 1">
          <button 
            [disabled]="currentPage() === 0" 
            (click)="previousPage()">
            Anterior
          </button>
          <span>Página {{ currentPage() + 1 }} de {{ totalPages() }}</span>
          <button 
            [disabled]="currentPage() === totalPages() - 1" 
            (click)="nextPage()">
            Siguiente
          </button>
        </div>
      </div>
      
      <!-- Formulario para crear/editar -->
      <div class="form-container">
        <h2>{{ isEditing() ? 'Editar' : 'Nuevo' }} Producto</h2>
        <form (ngSubmit)="guardarProducto()">
          <div>
            <label>Código:</label>
            <input 
              type="text" 
              [(ngModel)]="formData.codigo" 
              name="codigo" 
              required>
          </div>
          
          <div>
            <label>Nombre:</label>
            <input 
              type="text" 
              [(ngModel)]="formData.nombre" 
              name="nombre" 
              required>
          </div>
          
          <div>
            <label>Descripción:</label>
            <textarea 
              [(ngModel)]="formData.descripcion" 
              name="descripcion">
            </textarea>
          </div>
          
          <div>
            <label>Precio:</label>
            <input 
              type="number" 
              [(ngModel)]="formData.precio" 
              name="precio" 
              step="0.01" 
              required>
          </div>
          
          <div>
            <label>Stock:</label>
            <input 
              type="number" 
              [(ngModel)]="formData.stock" 
              name="stock" 
              required>
          </div>
          
          <div>
            <label>Stock Mínimo:</label>
            <input 
              type="number" 
              [(ngModel)]="formData.stockMinimo" 
              name="stockMinimo" 
              required>
          </div>
          
          <div>
            <label>Categoría:</label>
            <input 
              type="text" 
              [(ngModel)]="formData.categoria" 
              name="categoria" 
              required>
          </div>
          
          <div>
            <label>Unidad de Medida:</label>
            <input 
              type="text" 
              [(ngModel)]="formData.unidadMedida" 
              name="unidadMedida" 
              required>
          </div>
          
          <div class="form-actions">
            <button type="submit" [disabled]="isSaving()">
              {{ isSaving() ? 'Guardando...' : 'Guardar' }}
            </button>
            <button type="button" (click)="cancelar()">Cancelar</button>
          </div>
        </form>
      </div>
      
      <!-- Búsqueda por código -->
      <div class="search-container">
        <h3>Buscar por Código</h3>
        <input 
          type="text" 
          [(ngModel)]="searchCodigo" 
          placeholder="Ingresa el código del producto">
        <button (click)="buscarPorCodigo()">Buscar</button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .loading, .error, .success {
      padding: 15px;
      margin: 10px 0;
      border-radius: 4px;
    }
    
    .loading {
      background-color: #e3f2fd;
      color: #1976d2;
    }
    
    .error {
      background-color: #ffebee;
      color: #c62828;
    }
    
    .success {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    
    th {
      background-color: #f5f5f5;
      font-weight: bold;
    }
    
    button {
      padding: 8px 16px;
      margin: 0 5px;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      background-color: #1976d2;
      color: white;
    }
    
    button:hover:not(:disabled) {
      background-color: #1565c0;
    }
    
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    
    .form-container {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    
    .form-container div {
      margin: 15px 0;
    }
    
    .form-container label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }
    
    .form-container input,
    .form-container textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }
    
    .form-actions {
      margin-top: 20px;
    }
    
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
      margin: 20px 0;
    }
    
    .search-container {
      background-color: #fff;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin: 20px 0;
    }
    
    .search-container input {
      padding: 8px;
      margin: 0 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class ProductosExampleComponent implements OnInit {
  // Inyección de servicios
  private inventarioService = inject(InventarioService);
  private router = inject(Router);
  
  // Señales para manejo de estado
  productos = signal<Producto[]>([]);
  isLoading = signal(false);
  isSaving = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  isEditing = signal(false);
  
  // Paginación
  currentPage = signal(0);
  pageSize = signal(AppConstants.DEFAULT_PAGE_SIZE);
  totalPages = signal(0);
  totalElements = signal(0);
  
  // Formulario
  formData: Partial<Producto> = this.getEmptyForm();
  
  // Búsqueda
  searchCodigo = '';
  
  ngOnInit(): void {
    this.cargarProductos();
  }
  
  /**
   * Carga la lista de productos desde el backend
   */
  cargarProductos(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    
    this.inventarioService.getProductos({
      page: this.currentPage(),
      size: this.pageSize()
    }).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.productos.set(response.data);
          
          // Actualizar información de paginación
          if (response.pagination) {
            this.totalPages.set(response.pagination.totalPages);
            this.totalElements.set(response.pagination.totalElements);
          }
          
          console.log('Productos cargados:', response.data);
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.errorMessage.set(error.message || 'Error al cargar los productos');
        this.isLoading.set(false);
      }
    });
  }
  
  /**
   * Guarda un producto (crear o actualizar)
   */
  guardarProducto(): void {
    this.isSaving.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    
    const observable = this.isEditing() && this.formData.id
      ? this.inventarioService.updateProducto(this.formData.id, this.formData)
      : this.inventarioService.createProducto(this.formData);
    
    observable.subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage.set(
            this.isEditing() 
              ? 'Producto actualizado exitosamente' 
              : 'Producto creado exitosamente'
          );
          this.cancelar();
          this.cargarProductos(); // Recargar la lista
        }
        this.isSaving.set(false);
      },
      error: (error) => {
        console.error('Error al guardar producto:', error);
        this.errorMessage.set(error.message || 'Error al guardar el producto');
        this.isSaving.set(false);
      }
    });
  }
  
  /**
   * Prepara el formulario para editar un producto
   */
  editarProducto(producto: Producto): void {
    this.formData = { ...producto };
    this.isEditing.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');
  }
  
  /**
   * Elimina un producto
   */
  eliminarProducto(id: string | number): void {
    if (!confirm('¿Estás seguro de eliminar este producto?')) {
      return;
    }
    
    this.inventarioService.deleteProducto(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage.set('Producto eliminado exitosamente');
          this.cargarProductos(); // Recargar la lista
        }
      },
      error: (error) => {
        console.error('Error al eliminar producto:', error);
        this.errorMessage.set(error.message || 'Error al eliminar el producto');
      }
    });
  }
  
  /**
   * Busca un producto por código
   */
  buscarPorCodigo(): void {
    if (!this.searchCodigo.trim()) {
      this.errorMessage.set('Ingresa un código para buscar');
      return;
    }
    
    this.isLoading.set(true);
    this.errorMessage.set('');
    
    this.inventarioService.getProductoByCodigo(this.searchCodigo).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          // Mostrar el producto encontrado en la tabla
          this.productos.set([response.data]);
          this.successMessage.set('Producto encontrado');
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error al buscar producto:', error);
        this.errorMessage.set(error.message || 'Producto no encontrado');
        this.isLoading.set(false);
      }
    });
  }
  
  /**
   * Cancela la edición y limpia el formulario
   */
  cancelar(): void {
    this.formData = this.getEmptyForm();
    this.isEditing.set(false);
  }
  
  /**
   * Navega a la página anterior
   */
  previousPage(): void {
    if (this.currentPage() > 0) {
      this.currentPage.set(this.currentPage() - 1);
      this.cargarProductos();
    }
  }
  
  /**
   * Navega a la página siguiente
   */
  nextPage(): void {
    if (this.currentPage() < this.totalPages() - 1) {
      this.currentPage.set(this.currentPage() + 1);
      this.cargarProductos();
    }
  }
  
  /**
   * Retorna un formulario vacío
   */
  private getEmptyForm(): Partial<Producto> {
    return {
      codigo: '',
      nombre: '',
      descripcion: '',
      categoria: '',
      precio: 0,
      stock: 0,
      stockMinimo: 0,
      unidadMedida: '',
      activo: true
    };
  }
}

/*
 * ============================================
 * NOTAS DE USO
 * ============================================
 * 
 * Este componente demuestra:
 * 
 * 1. USO DE SIGNALS (Angular 17+):
 *    - productos = signal<Producto[]>([])
 *    - Actualización: this.productos.set(newData)
 *    - Lectura en template: productos()
 * 
 * 2. INYECCIÓN DE SERVICIOS:
 *    - private inventarioService = inject(InventarioService)
 * 
 * 3. MANEJO DE ESTADOS:
 *    - isLoading: Muestra spinner de carga
 *    - isSaving: Deshabilita botón mientras guarda
 *    - errorMessage: Muestra mensajes de error
 *    - successMessage: Muestra mensajes de éxito
 * 
 * 4. OPERACIONES CRUD:
 *    - Listar: getProductos()
 *    - Crear: createProducto()
 *    - Actualizar: updateProducto()
 *    - Eliminar: deleteProducto()
 * 
 * 5. PAGINACIÓN:
 *    - currentPage, pageSize, totalPages
 *    - nextPage(), previousPage()
 * 
 * 6. BÚSQUEDA:
 *    - buscarPorCodigo()
 * 
 * 7. MANEJO DE ERRORES:
 *    - Bloque error en subscribe
 *    - Mensajes de error al usuario
 * 
 * ============================================
 * PARA USAR ESTE COMPONENTE:
 * ============================================
 * 
 * 1. Renombrar el archivo y la clase según tu necesidad
 * 2. Ajustar el servicio inyectado
 * 3. Modificar el modelo de datos (Producto)
 * 4. Personalizar el template según tu diseño
 * 5. Agregar validaciones adicionales si es necesario
 */
