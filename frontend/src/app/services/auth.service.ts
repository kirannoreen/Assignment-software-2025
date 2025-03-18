import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, credentials);
  }

  register(user: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register/`, user);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean | null {
    if (localStorage.getItem('role') == 'admin')
      return true;
    else
    return false;
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
}
