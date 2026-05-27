
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { RegisterService } from '../../services/register.service';
import { CreateEvent, Event } from '../../data-type';

@Component({
  selector: 'app-host-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.css']
})
export class HostDashboardComponent implements OnInit {
  // 🔽 Inputs from parent
  @Input() hostName: string = '';
  @Input() hostEmail: string = '';
  @Input() activeSection: string = 'create-event';

  @Output() sectionChange = new EventEmitter<string>();

  hostEvents: Event[] = [];
  eventRegistrations: { [key: number]: any[] | undefined } = {};
  newEvent: CreateEvent = { title: '', date: '', description: '', image: '' };

  constructor(
    private eventService: EventService,
    private regService: RegisterService
  ) {}

  ngOnInit(): void {
    this.loadHostEvents();
  }

  loadHostEvents() {
    this.eventService.getHostEvents(this.hostEmail).subscribe(res => {
      this.hostEvents = res;
      this.hostEvents.forEach(event => {
        this.regService.getRegistrationsByEvent(event.id!).subscribe({
          next: regs => this.eventRegistrations[event.id!] = regs || [],
          error: err => {
            this.eventRegistrations[event.id!] = [];
            alert(err.message);
          }
        });
      });
    });
  }

  createNewEvent(data: CreateEvent) {
    const event: Omit<Event, 'id'> = { ...data, host_email: this.hostEmail };
    console.log("Creating event:", event);
    this.eventService.createEvent(event).subscribe({
      next: () => {
        alert(`Event "${event.title}" is sent for admin approval`);
        this.newEvent = { title: '', date: '', description: '', image: '' };
        this.loadHostEvents();
        this.sectionChange.emit('my-events');
      },
      error: err => alert(err.message)
    });
  }

  deleteEvents(event: Event) {
    if (!confirm('Are you sure you want to Delete?')) return;
    this.eventService.deleteEvent(event.id!).subscribe({
      next: () => {
        alert(`Event "${event.title}" successfully deleted`);
        this.loadHostEvents();
      },
      error: err => alert(err.message)
    });
  }
}





















/* -------------- Host-dashboard.components.ts -----------------
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { RegisterService } from '../../services/register.service';
import { CreateEvent, Event } from '../../data-type';


@Component({
  selector: 'app-host-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './host-dashboard.component.html',
  styleUrl: './host-dashboard.component.css'
})

export class HostDashboardComponent {
  isSubmitting = false;
  hostName: string = "";
  hostEmail: string = "";
  activeSection = 'create-event';
  hostEvents: Event[] = [];

  eventRegistrations: { [key: number]: any[] | undefined } = {};

  newEvent: CreateEvent = {title: '', date: '', description: '', image: ''};
  reset() {this.newEvent = { title: '', date: '', description: '', image: '',}}

  constructor( 
    private eventService: EventService, 
    private auth: AuthService, 
    private regService: RegisterService
  ) {}

  ngOnInit(): void {
    this.loadHostData(); 
    this.loadHostEvents()
  }

  navigateTo(section: string) {
    this.activeSection = section;

    if (section === 'my-events') this.loadHostEvents();
    else if (section === 'logout') setTimeout(() => this.auth.logout(), 1000);
  }

  private loadHostData(): void {
    const hostData = this.auth.getUser();
   
    this.hostName = hostData.name
    this.hostEmail = hostData.email
  }

  loadHostEvents() {
    this.eventService.getHostEvents(this.hostEmail).subscribe(res => {
      this.hostEvents = res;

      this.hostEvents.forEach(event => {
        this.regService.getRegistrationsByEvent(event.id!).subscribe({
          next: (regs) => {
            this.eventRegistrations[event.id!] = regs || [];
          },
          error: (err) => {
            this.eventRegistrations[event.id!] = [];
            alert(err.message);
          }
        });
      });
    });
  }


  createNewEvent(data: CreateEvent) {
    const event: Omit<Event, 'id'> = {
      ...data,
      host_email: this.hostEmail,
    };

    this.eventService.createEvent(event).subscribe({
      next: () => {
        alert("Event is sent for admin approval");
        this.reset();
        this.loadHostEvents();
        this.activeSection = "my-events";
      },
      error: (err) => alert(err.message)
    });
  }

  deleteEvents(event: Event) {
    if (!confirm('Are you sure you want to Delete?')) return;

    this.eventService.deleteEvent(event.id!).subscribe({
      next: () => {
        alert('Event successfully deleted');
        this.loadHostEvents();
      },
      error: (err) => alert(err.message)
    });
  }
} */