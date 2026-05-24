// header.ts
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  isAccountMenuOpen = false;

  toggleAccountMenu(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }

  closeAccountMenu() {
    this.isAccountMenuOpen = false;
  }

  async logout() {
    await this.authService.logout();
    this.closeAccountMenu();
    await this.router.navigate(['/home']);
  }

  async deleteAccount() {
    await this.authService.deleteAccount();
    this.closeAccountMenu();
    await this.router.navigate(['/home']);
  }
}
