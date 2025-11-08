import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';
  userSubject = new BehaviorSubject<any>(null)
  user$ = this.userSubject.asObservable();
  constructor(private http: HttpClient) { }

  setUser(val: any) {
    this.userSubject.next(val)
  }
  
  getUser() {
    return this.user$;
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data)
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data)
  }

  isLoggedIn(): Boolean {
    return !!localStorage.getItem('authToken')
  }

  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user')
  }
}
