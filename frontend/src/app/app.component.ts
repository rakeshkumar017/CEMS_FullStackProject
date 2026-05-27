import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = "college-event-management-system"
  
  constructor(private router: Router) { }

  isActive(route: string): Boolean { return this.router.url === route };
}
