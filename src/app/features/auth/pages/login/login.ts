import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
})
export class Login {
  private router = inject(Router);

  // Simple submit handler: reemplaza esto por la llamada al servicio de autenticación
  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('Login submit', { email, password });
    
    // Por ahora, cualquier credencial es válida y navega al dashboard
    // TODO: inyectar y usar servicio Auth para autenticar
    this.router.navigate(['/dashboard']);
  }
}
