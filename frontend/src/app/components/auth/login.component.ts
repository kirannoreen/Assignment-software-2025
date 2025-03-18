import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login({ username: this.username, password: this.password }).subscribe(response => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);
      this.router.navigate(['/tasks']);
    }, error => {
      alert('Invalid credentials!');
    });
  }
}
