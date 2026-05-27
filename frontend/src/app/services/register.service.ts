import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event, Registration } from '../data-type';

@Injectable({ providedIn: 'root' })
export class RegisterService {

  constructor(private http: HttpClient) {}

  /* -------------- Student-Dashboard ----------------- */
  register(eventId: number, email: string, name: string) {
    return this.http.post(`/registrations`, {eventId, email, name});
  }

  unregister(eventId: number, email: string) {
    return this.http.post(`/registrations/unregister`, {eventId, email});
  }

  fetchRegisteredEvents(email: string) {
    return this.http.get<Event[]>(`registrations/${email}`);
  }

  getRegisteredEventIds(email: string) {
    return this.http.get<string[]>(`registrations/ids/${email}`);
  }

  getRegistrationsByEvent(eventId: number) {
    return this.http.get<any[]>(`registrations/event/${eventId}`);
  }
}