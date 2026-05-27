/* -------------- dashboard.components.ts(parent) ----------------- */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HostDashboardComponent } from './host-dashboard/host-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ AdminDashboardComponent, HostDashboardComponent, StudentDashboardComponent, CommonModule ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  role: string = '';
  userName: string = '';
  userEmail: string = '';
  activeSection: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.role = (user.role || '').toLowerCase();
    this.userName = user.name || '';
    this.userEmail = user.email || '';

    /*------- default section per role -------*/
    switch (this.role) {
      case 'admin': this.activeSection = 'dashboard'; break;
      case 'host': this.activeSection = 'create-event'; break;
      case 'student': this.activeSection = 'upcoming-events'; break;
      default: this.activeSection = '';
    }
  }

  handleLogout() {
    this.activeSection = 'logout'
    setTimeout(() => this.auth.logout(), 2000); 
  }
}