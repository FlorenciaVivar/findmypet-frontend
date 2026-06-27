import { Component, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-form.component.html'
})
export class AuthFormComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  authSuccess = output<{ token: string; user: any }>();
  closeModal = output<void>();

  isLogin = signal<boolean>(true);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  successMessage = signal<string>('');

  authForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    fullName: ['']
  });

  toggleMode() {
    this.isLogin.update(val => !val);
    this.errorMessage.set('');

    const fullNameControl = this.authForm.get('fullName');
    if (!this.isLogin()) {
      fullNameControl?.setValidators([Validators.required]);
    } else {
      fullNameControl?.clearValidators();
    }
    fullNameControl?.updateValueAndValidity();
  }

  handleSubmit() {
    if (this.authForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const payload = this.authForm.value;

    const url = this.isLogin() ? '/api/auth/login' : '/api/auth/register';
    console.log(`[Angular HttpService] POST ${url} payload:`, { ...payload, password: '•' });

    const authObs = this.isLogin()
      ? this.authService.login({ email: payload.email, password: payload.password })
      : this.authService.register(payload);

    authObs.subscribe({
      next: (res) => {
        this.successMessage.set(this.isLogin() ? '¡Sesión iniciada correctamente!' : '¡Registro completado con éxito!');
        setTimeout(() => {
          this.authSuccess.emit(res);
          this.closeModal.emit();
        }, 1000);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.error || 'Error al conectar con el servidor.');
      },
      complete: () => this.isLoading.set(false)
    });
  }
}
