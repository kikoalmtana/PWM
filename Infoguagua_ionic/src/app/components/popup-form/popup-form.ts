import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-popup-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './popup-form.html',
  styleUrl: './popup-form.css',
})
export class PopupComponent {
  isOpen = false;
  email = '';
  showSuccess = false;

  open() {
    console.log("PopupComponent open");
    this.isOpen = true;
    this.showSuccess = false;
    this.email = '';
  }

  close() {
    this.isOpen = false;
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  send() {
    if (!this.email) return;
    this.showSuccess = true;
  }
}
