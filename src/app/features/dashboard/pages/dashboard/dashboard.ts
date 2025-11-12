import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  badge?: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true,
})
export class Dashboard {
  isSidebarOpen = true;
  currentUser = 'Usuario 1';
  currentRoute = 'dashboard';

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: 'dashboard' },
    { label: 'Usuarios', icon: 'users', route: 'usuarios' },
    { label: 'Inventario', icon: 'inventory', route: 'inventario' },
    { label: 'Ventas', icon: 'sales', route: 'ventas' },
    { label: 'Caja Chica', icon: 'cash', route: 'caja-chica' },
    { label: 'Reportes Generales', icon: 'reports', route: 'reportes' },
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  navigateTo(route: string) {
    this.currentRoute = route;
    // Por ahora solo cambiamos la ruta visual
    // Cuando tengas las rutas configuradas, usa: this.router.navigate([route]);
  }

  getPageTitle(): string {
    if (this.currentRoute === 'dashboard') {
      return 'Dashboard';
    }
    const menuItem = this.menuItems.find(m => m.route === this.currentRoute);
    return menuItem ? menuItem.label : 'Dashboard';
  }

  getModuleName(): string {
    const menuItem = this.menuItems.find(m => m.route === this.currentRoute);
    return menuItem ? menuItem.label : '';
  }

  logout() {
    // Implementar lógica de logout
    this.router.navigate(['/auth/login']);
  }
}
