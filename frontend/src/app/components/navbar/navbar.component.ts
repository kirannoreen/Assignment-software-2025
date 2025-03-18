import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  loginas = "";
  
  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (this.authService.isAuthenticated()) {
      this.loginas = "Login as " + this.authService.getUserRole();
    } else {
      this.loginas = "";
    }
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
