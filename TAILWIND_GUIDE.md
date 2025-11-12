# Guía de Tailwind CSS para Farmacia Frontend

## Instalación Completada ✅

Tailwind CSS ha sido instalado y configurado en tu proyecto Angular.

### Archivos Configurados:

1. **tailwind.config.js** - Configuración de Tailwind
2. **postcss.config.js** - Configuración de PostCSS
3. **src/styles.css** - Directivas de Tailwind agregadas

## Componentes Comunes con Tailwind CSS

### 1. Botones

```html
<!-- Botón Primario -->
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Guardar
</button>

<!-- Botón Secundario -->
<button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
  Cancelar
</button>

<!-- Botón con Sombra -->
<button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg">
  Éxito
</button>

<!-- Botón Outline -->
<button
  class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
>
  Outline
</button>

<!-- Botón Deshabilitado -->
<button
  class="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
  disabled
>
  Deshabilitado
</button>
```

### 2. Formularios

```html
<!-- Input Text -->
<div class="mb-4">
  <label class="block text-gray-700 text-sm font-bold mb-2" for="nombre">
    Nombre del Producto
  </label>
  <input
    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="nombre"
    type="text"
    placeholder="Ingrese nombre"
  />
</div>

<!-- Input con Error -->
<div class="mb-4">
  <label class="block text-gray-700 text-sm font-bold mb-2" for="precio"> Precio </label>
  <input
    class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
    id="precio"
    type="text"
    placeholder="0.00"
  />
  <p class="text-red-500 text-xs italic">Por favor ingrese un precio válido.</p>
</div>

<!-- Select -->
<div class="mb-4">
  <label class="block text-gray-700 text-sm font-bold mb-2" for="categoria"> Categoría </label>
  <select
    class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="categoria"
  >
    <option>Medicamentos</option>
    <option>Higiene</option>
    <option>Suplementos</option>
  </select>
</div>

<!-- Textarea -->
<div class="mb-4">
  <label class="block text-gray-700 text-sm font-bold mb-2" for="descripcion"> Descripción </label>
  <textarea
    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="descripcion"
    rows="4"
    placeholder="Descripción del producto"
  ></textarea>
</div>

<!-- Checkbox -->
<div class="mb-4">
  <label class="flex items-center">
    <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" />
    <span class="ml-2 text-gray-700">Requiere receta médica</span>
  </label>
</div>
```

### 3. Tarjetas (Cards)

```html
<!-- Tarjeta Simple -->
<div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">Producto</div>
    <p class="text-gray-700 text-base">Descripción del producto aquí.</p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span
      class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
      >#medicamento</span
    >
  </div>
</div>

<!-- Tarjeta con Imagen -->
<div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
  <img class="w-full" src="/img/producto.jpg" alt="Producto" />
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">Paracetamol 500mg</div>
    <p class="text-gray-700 text-base">Analgésico y antipirético</p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
      Agregar al Carrito
    </button>
  </div>
</div>

<!-- Tarjeta de Estadísticas -->
<div class="bg-white overflow-hidden shadow rounded-lg">
  <div class="p-5">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div class="ml-5 w-0 flex-1">
        <dl>
          <dt class="text-sm font-medium text-gray-500 truncate">Ventas Totales</dt>
          <dd class="text-2xl font-semibold text-gray-900">$45,231.89</dd>
        </dl>
      </div>
    </div>
  </div>
</div>
```

### 4. Tablas

```html
<div class="overflow-x-auto bg-white rounded-lg shadow">
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Producto
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Categoría
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Stock
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Precio
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Acciones
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <tr>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm font-medium text-gray-900">Paracetamol 500mg</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">Analgésicos</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span
            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
          >
            150
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$15.50</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <a href="#" class="text-blue-600 hover:text-blue-900 mr-3">Editar</a>
          <a href="#" class="text-red-600 hover:text-red-900">Eliminar</a>
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm font-medium text-gray-900">Ibuprofeno 400mg</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">Analgésicos</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span
            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
          >
            5
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$22.00</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <a href="#" class="text-blue-600 hover:text-blue-900 mr-3">Editar</a>
          <a href="#" class="text-red-600 hover:text-red-900">Eliminar</a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### 5. Alertas

```html
<!-- Alerta de Éxito -->
<div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
  <p class="font-bold">Éxito</p>
  <p>El producto ha sido guardado correctamente.</p>
</div>

<!-- Alerta de Error -->
<div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
  <p class="font-bold">Error</p>
  <p>No se pudo completar la operación.</p>
</div>

<!-- Alerta de Advertencia -->
<div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
  <p class="font-bold">Advertencia</p>
  <p>El stock está por debajo del mínimo.</p>
</div>

<!-- Alerta de Información -->
<div class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
  <p class="font-bold">Información</p>
  <p>Recuerde realizar el inventario mensual.</p>
</div>

<!-- Alerta Dismissible -->
<div
  class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4"
  role="alert"
>
  <strong class="font-bold">Información!</strong>
  <span class="block sm:inline">Esta es una alerta que se puede cerrar.</span>
  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg
      class="fill-current h-6 w-6 text-blue-500"
      role="button"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <title>Cerrar</title>
      <path
        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
      />
    </svg>
  </span>
</div>
```

### 6. Modales

```html
<!-- Overlay del Modal -->
<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
  <!-- Contenedor del Modal -->
  <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
    <!-- Header del Modal -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-medium leading-6 text-gray-900">Agregar Producto</h3>
      <button class="text-gray-400 hover:text-gray-500">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Body del Modal -->
    <div class="mt-2 mb-4">
      <p class="text-sm text-gray-500">Ingrese los datos del nuevo producto.</p>
      <div class="mt-4">
        <input
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nombre del producto"
        />
      </div>
    </div>

    <!-- Footer del Modal -->
    <div class="flex items-center justify-end gap-2">
      <button class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
        Cancelar
      </button>
      <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Guardar</button>
    </div>
  </div>
</div>
```

### 7. Badges y Pills

```html
<!-- Badges -->
<span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
  >En Stock</span
>
<span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">Agotado</span>
<span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
  >Disponible</span
>
<span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
  >Stock Bajo</span
>

<!-- Pills -->
<span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
  >Medicamento</span
>
<span class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
  >Suplemento</span
>
<span class="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
  >Higiene</span
>
```

### 8. Navegación

```html
<!-- Nav Tabs -->
<div class="border-b border-gray-200">
  <nav class="-mb-px flex space-x-8">
    <a
      href="#"
      class="border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
    >
      Inventario
    </a>
    <a
      href="#"
      class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
    >
      Ventas
    </a>
    <a
      href="#"
      class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
    >
      Reportes
    </a>
  </nav>
</div>

<!-- Breadcrumbs -->
<nav class="flex mb-4" aria-label="Breadcrumb">
  <ol class="inline-flex items-center space-x-1 md:space-x-3">
    <li class="inline-flex items-center">
      <a href="#" class="text-gray-700 hover:text-blue-600"> Dashboard </a>
    </li>
    <li>
      <div class="flex items-center">
        <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        <a href="#" class="ml-1 text-gray-700 hover:text-blue-600 md:ml-2"> Inventario </a>
      </div>
    </li>
    <li aria-current="page">
      <div class="flex items-center">
        <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="ml-1 text-gray-500 md:ml-2">Productos</span>
      </div>
    </li>
  </ol>
</nav>
```

### 9. Grid Layouts

```html
<!-- Grid de 2 Columnas -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="bg-white p-4 rounded shadow">Columna 1</div>
  <div class="bg-white p-4 rounded shadow">Columna 2</div>
</div>

<!-- Grid de 3 Columnas -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="bg-white p-4 rounded shadow">Columna 1</div>
  <div class="bg-white p-4 rounded shadow">Columna 2</div>
  <div class="bg-white p-4 rounded shadow">Columna 3</div>
</div>

<!-- Grid de 4 Columnas -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <div class="bg-white p-4 rounded shadow">Columna 1</div>
  <div class="bg-white p-4 rounded shadow">Columna 2</div>
  <div class="bg-white p-4 rounded shadow">Columna 3</div>
  <div class="bg-white p-4 rounded shadow">Columna 4</div>
</div>
```

### 10. Paginación

```html
<div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
  <div class="flex flex-1 justify-between sm:hidden">
    <a
      href="#"
      class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      Anterior
    </a>
    <a
      href="#"
      class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      Siguiente
    </a>
  </div>
  <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
    <div>
      <p class="text-sm text-gray-700">
        Mostrando <span class="font-medium">1</span> a <span class="font-medium">10</span> de
        <span class="font-medium">97</span> resultados
      </p>
    </div>
    <div>
      <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <a
          href="#"
          class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <span class="sr-only">Anterior</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
        <a
          href="#"
          class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >1</a
        >
        <a
          href="#"
          class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >2</a
        >
        <a
          href="#"
          class="relative inline-flex items-center px-4 py-2 text-sm font-semibold bg-blue-600 text-white ring-1 ring-inset ring-gray-300"
          >3</a
        >
        <a
          href="#"
          class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >4</a
        >
        <a
          href="#"
          class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >5</a
        >
        <a
          href="#"
          class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <span class="sr-only">Siguiente</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </nav>
    </div>
  </div>
</div>
```

## Utilidades Comunes de Tailwind

### Espaciado

- `p-4` - padding de 1rem (16px)
- `m-4` - margin de 1rem
- `px-4` - padding horizontal
- `py-4` - padding vertical
- `mt-4` - margin top
- `mb-4` - margin bottom

### Colores

- `bg-blue-500` - fondo azul
- `text-gray-700` - texto gris
- `border-red-500` - borde rojo

### Tipografía

- `text-sm` - texto pequeño
- `text-lg` - texto grande
- `font-bold` - negrita
- `font-medium` - medio
- `text-center` - centrar texto

### Flexbox

- `flex` - display flex
- `items-center` - align-items center
- `justify-between` - justify-content space-between
- `gap-4` - espacio entre elementos

### Grid

- `grid` - display grid
- `grid-cols-3` - 3 columnas
- `gap-4` - espacio entre elementos

### Responsive

- `sm:` - pantallas pequeñas (640px+)
- `md:` - pantallas medianas (768px+)
- `lg:` - pantallas grandes (1024px+)
- `xl:` - pantallas extra grandes (1280px+)

Ejemplo: `md:grid-cols-2 lg:grid-cols-4`

## Cómo Iniciar el Proyecto

```bash
npm start
```

El servidor se iniciará en `http://localhost:4200`

## Recursos Adicionales

- [Documentación oficial de Tailwind CSS](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/components)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Heroicons - Iconos SVG](https://heroicons.com/)

## Ejemplo Implementado

El componente `dashboard` ha sido actualizado con un ejemplo completo usando Tailwind CSS que incluye:

- Tarjetas de estadísticas
- Grids responsivos
- Tablas
- Botones estilizados
- Íconos SVG

¡Ahora puedes empezar a desarrollar tu aplicación usando Tailwind CSS! 🎨
