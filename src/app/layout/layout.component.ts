import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  username: string = '';

  constructor(private router: Router) {
    // Retrieve the logged-in user from localStorage
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      const email = JSON.parse(userJson).email;
      this.username = email.split('@')[0]; // Get the part before '@'
    }
  }

  // Clear user data and navigate to login page
  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
