import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Event } from '../data-type';
import { EventService } from '../services/event.service';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})

export class EventsComponent implements OnInit {
  loading = true;
  events: Event[] = [];

  eventRegistrations: { [eventId: number]: number } = {};

  constructor(
    private eventService: EventService ,
    private regService: RegisterService
  ) {}

  ngOnInit() {  this.loadEvents(); }

  /*-------------------- Approved Events Views ---------------------------*/
  loadEvents() {
    this.eventService.getApprovedEvents().subscribe({
      next: (res) => {
        this.events = res;
        this.loading = false;

        this.events.forEach(event => {
          this.regService.getRegistrationsByEvent(event.id).subscribe({
            next: (registrations) => this.eventRegistrations[event.id] = registrations.length,
            error: () => this.eventRegistrations[event.id] = 0
          })
        });
      },
      error: (err) => {
        this.loading = false;
        alert(err.message);
      }
    });
  }
}