import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  standalone: true,
  imports: [
    MatIcon
  ],
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {

  isLogin = true;

  email = '';
  password = '';
  fullName = '';

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  @Output() authSuccess = new EventEmitter<{ token: string; user: any }>();
  @Output() close = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  submit() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    const request = this.isLogin
      ? this.authService.login(this.email, this.password)
      : this.authService.register(this.email, this.password, this.fullName);

    request.subscribe({
      next: (data) => {
        this.successMessage = this.isLogin
          ? '¡Sesión iniciada correctamente!'
          : '¡Registro completado con éxito!';

        setTimeout(() => {
          this.authSuccess.emit(data);
          this.close.emit();
        }, 1000);

        this.isLoading = false;
      },
      error: (err) => {
        console.error('[Angular HttpService] Error:', err);
        this.errorMessage = err?.error?.error || 'Error al conectar con el servidor';
        this.isLoading = false;
      }
    });
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.errorMessage = '';
  }
}
