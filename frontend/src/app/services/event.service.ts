import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../data-type';

@Injectable({ providedIn: 'root' })

export class EventService {

  constructor(private http: HttpClient) {}

  /*------------------ Host-Dashboard ------------------------*/
  checkEventExists(title: string, date: string) {
    return this.http.get<Event[]>(`/events/check?title=${title}&date=${date}`);
  }

  createEvent(event: Omit<Event, 'id'>) {return this.http.post<Event>('/events', event)};
  getHostEvents(email: string) { return this.http.get<Event[]>(`/events/host/${email}`)};
  deleteEvent(id: number) { return this.http.delete(`/events/${id}`)};

  
  /*------------------ Admin-Dashboard ------------------------*/
  getApprovedEvents() {return this.http.get<Event[]>(`/events/approved`)};
  getUnApprovedEvents() {return this.http.get<Event[]>(`/events/unapproved`)};

  approveEvent(id: number) { return this.http.patch(`/events/${id}`, {})};
}