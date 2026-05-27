import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  imports: [],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})

export class HomeComponent {
  constructor(private router: Router) {}

  @HostListener("window:scroll", ["$event"])
  
  onScroll() {
    const button = document.querySelector(".get-started-section") as HTMLElement;
    if (window.scrollY > 100) button.style.display = "block";
    else button.style.display = "none";
  }

  navigateToLogin() {
    this.router.navigateByUrl("/register");
  }
}
