import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event, User } from '../../data-type';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { RegisterService } from '../../services/register.service';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  // 🔽 Inputs from parent
  @Input() adminName: string = '';
  @Input() activeSection: string = 'dashboard';

  // 🔼 Outputs to parent
  @Output() eventApproved = new EventEmitter<String>();

  users: User[] = [];
  events: Event[] = [];
  pendingEvents: Event[] = [];
  eventRegistrationCount: { [eventId: number]: number } = {};
  eventRegistrations: { [eventId: number]: any[] } = {};

  constructor(
    private auth: AuthService,
    private eventService: EventService,
    private registerService: RegisterService
  ) {}

  ngOnInit() {
    this.loadData();
  }


  loadData() {
    this.eventService.getApprovedEvents().subscribe(res => {
      this.events = res;
      this.events.forEach(event => {
        if (event.id) {
          this.registerService.getRegistrationsByEvent(event.id).subscribe(regs => {
            this.eventRegistrations[event.id!] = regs;
            this.eventRegistrationCount[event.id!] = regs.length;
          });
        }
      });
    });

    this.eventService.getUnApprovedEvents().subscribe(res => this.pendingEvents = res);
    this.auth.getAllUsers().subscribe(res => this.users = res);
  }

  approve(eventId: number) {
      this.eventService.approveEvent(eventId).subscribe(() => {
        alert("Event approved!");
        this.loadData();
      });
  }
}