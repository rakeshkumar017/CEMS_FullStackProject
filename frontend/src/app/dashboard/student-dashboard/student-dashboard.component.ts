/* -------------- Student-dashboard.components.ts ----------------- */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { RegisterService } from '../../services/register.service';
import { AuthService } from '../../services/auth.service';
import { Event } from '../../data-type';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  /*------- Inputs from parent -------*/
  @Input() studentName: string = '';
  @Input() studentEmail: string = '';
  @Input() activeSection: string = 'upcoming-events';

  @Output() sectionChange = new EventEmitter<string>();

  studentDept: string = '';
  studentRoll: string = '';
  events: Event[] = [];
  registeredEvents: Event[] = [];
  isEditingProfile = false;

  constructor(
    private auth: AuthService,
    private eventService: EventService,
    private regService: RegisterService
  ) {}
  

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.studentDept = user.department || '';
    this.studentRoll = user.roll_number || '';

    this.loadEvents();
    this.fetchRegisteredEvents();
  }


  loadEvents(): void {
    this.eventService.getApprovedEvents().subscribe({
      next: res => this.events = res,
      error: err => alert(err.message)
    });
  }

  fetchRegisteredEvents() {
    this.regService.fetchRegisteredEvents(this.studentEmail).subscribe({
      next: res => this.registeredEvents = res,
      error: err => alert(err.message)
    });
  }

  isRegistered(event: Event) { return this.registeredEvents.some(e => e.id === event.id) };
  
  registerForEvent(eventId: number) {
    this.regService.register(eventId, this.studentEmail, this.studentName).subscribe({
      next: () => {
        alert('Registered successfully for the event');
        this.fetchRegisteredEvents();
        this.sectionChange.emit('registered-events');
      },
      error: err => alert(err.message)
    });
  }

  unregister(eventId: number) {
    if (!confirm('Are you sure you want to unregister from this event?')) return;
    
    this.regService.unregister(eventId, this.studentEmail).subscribe({
      next: () => {
        alert('Unregistered successfully from the event!');
        this.fetchRegisteredEvents();
      },
      error: err => alert(err.message)
    });
  }

  toggleEditProfile() { this.isEditingProfile = !this.isEditingProfile; }

  saveProfile() {
    const updatedFields = { department: this.studentDept, roll_number: this.studentRoll };

    this.auth.updateUser(this.studentEmail, updatedFields).subscribe({
      next: user => {
        localStorage.setItem('user', JSON.stringify(user));
        alert('Profile updated successfully!');
        this.isEditingProfile = false;
      },
      error: err => alert(err.message)
    });
  }
}