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

  isMenuOpen = false;
  isAccountMenuOpen = false;
  isMobileProfileOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.isMobileProfileOpen = false;
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.isMobileProfileOpen = false;
  }

  toggleAccountMenu(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }

  closeAccountMenu() {
    this.isAccountMenuOpen = false;
  }

  toggleMobileProfile(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isMobileProfileOpen = !this.isMobileProfileOpen;
  }

  async logout() {
    await this.authService.logout();
    this.closeAccountMenu();
    this.closeMenu();
    await this.router.navigate(['/home']);
  }

  async deleteAccount() {
    await this.authService.deleteAccount();
    this.closeAccountMenu();
    this.closeMenu();
    await this.router.navigate(['/home']);
  }
}
