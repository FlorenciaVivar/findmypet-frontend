import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {User} from '../models/user.model';


export interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  // Estados reactivos globales usando Signals
  currentUser = signal<User | null>(null);
  token = signal<string | null>(null);

  // Computed signal para saber si está autenticado al toque
  isAuthenticated = computed(() => !!this.token());

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/login', credentials).pipe(
      tap(res => this.setSession(res))
    );
  }

  register(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/register', userData).pipe(
      tap(res => this.setSession(res))
    );
  }

  private setSession(authRes: AuthResponse) {
    this.token.set(authRes.token);
    this.currentUser.set(authRes.user);
    localStorage.setItem('auth_token', authRes.token);
  }

  logout() {
    this.token.set(null);
    this.currentUser.set(null);
    localStorage.removeItem('auth_token');
  }
}
