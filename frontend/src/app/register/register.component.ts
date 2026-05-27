import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { Login, SignUp } from '../data-type'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  isSignUp: boolean = false;
  message: string = "Don't have an account? ";
  anchorText: string = 'Register';

  constructor(
    private router: Router, 
    private auth: AuthService
  ) {}

  toggleForm() {
    this.isSignUp = !this.isSignUp;
    this.message = this.isSignUp ?'Already Have Account? ' : "Don't have an account? ";
    this.anchorText = this.isSignUp ?  'Login' : 'Register';
  }

  /*---------- Registration Functionality ----------*/
  signUp(data: SignUp) {
    this.auth.register(data).subscribe({
      next: () => {
        alert("User successfully registered");
        this.toggleForm();
      }, 
      error: (err) => {
        if (err.status === 409) {
          alert("Email already exists! Please login instead.");
          this.toggleForm();
        } else alert("Something went wrong. Try again!" + err.message);
      }
    });
  }

  /*---------- Login Functionality ----------*/
  login(data: Login) {
    this.auth.login(data).subscribe({
      next: (res) => {
        const userData = res.user;
  
        /*----- store token  & loggedUser ----*/
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          department: userData.department || "",
          roll_number: userData.roll_number || ""
        }));

        this.router.navigate(['/dashboard']);
      },
  
      error: (err) => {
        if (err.status === 404) {
          alert("User doesn't exist. Please sign up first.");
          this.toggleForm();
        } else if (err.status === 401) {
          alert("Invalid email or password!");
        } else {
          alert("Something went wrong. Try again!");
        }
      }
    });
  }
}
