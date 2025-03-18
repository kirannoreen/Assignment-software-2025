import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register({ username: this.username, email: this.email, password: this.password }).subscribe(() => {
      alert('Registration successful!');
      this.router.navigate(['/login']);
    }, error => {
      alert('Registration failed!');
    });
  }
}
