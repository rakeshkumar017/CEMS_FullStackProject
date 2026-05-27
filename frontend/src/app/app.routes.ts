import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { RoleGuard } from './guards/role.guard';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'events', component: EventsComponent },
    { path: 'register', component: RegisterComponent },
    
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { role: ['admin','host','student'] } },
    { path: '**', redirectTo: '' }, // Redirect unknown routes to home
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }