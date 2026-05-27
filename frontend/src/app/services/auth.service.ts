import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login, SignUp, User } from '../data-type';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  /*---------- Authentication Methods ----------*/
  register(data: SignUp) { return this.http.post(`/auth/register`, data)};
  login(data: Login) { return this.http.post<any>(`/auth/login`, data)};


  getUser() { return JSON.parse(localStorage.getItem('user') || '{}') }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/register']);
  }

  /*---------- User Management ----------*/
  getAllUsers() {return this.http.get<User[]>('/auth/users')};
  updateUser(email: string, data: Partial<User>) { return this.http.put<User>(`/auth/users/${email}`, data) }
}