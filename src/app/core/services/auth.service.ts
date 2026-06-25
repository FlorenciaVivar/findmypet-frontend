import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    console.log('[Angular HttpService] POST login', { email, password: '•' });
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, {
      email,
      password
    });
  }

  register(email: string, password: string, fullName: string): Observable<AuthResponse> {
    console.log('[Angular HttpService] POST register', { email, password: '•', fullName });
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, {
      email,
      password,
      fullName
    });
  }
}
