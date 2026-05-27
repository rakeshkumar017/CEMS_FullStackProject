import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles: string[] = route.data['role'].map((r: string) => r.toLowerCase());
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userRole = (user.role || '').toLowerCase();

    console.log('RoleGuard - User role:', userRole, 'Allowed roles:', allowedRoles);

    if (allowedRoles.includes(userRole)) return true;
    
    this.router.navigate(['/login']);
    return false;
  }
}
