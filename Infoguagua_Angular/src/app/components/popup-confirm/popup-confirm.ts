import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-popup-confirm',
  imports: [],
  templateUrl: './popup-confirm.html',
  styleUrl: './popup-confirm.css',
})
export class PopupConfirm {
  private authService = inject(AuthService);
  private router = inject(Router);
  isOpen = false;
  showSuccess = false;

  open() {
    console.log("PopupComponent open");
    this.isOpen = true;
    this.showSuccess = false;
  }

  close() {
    this.isOpen = false;
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  async delete() {
    this.showSuccess = true;
    await this.authService.deleteAccount();
    this.router.navigate(['/login']);
  }
}
