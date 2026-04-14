import { Component } from '@angular/core';

@Component({
  selector: 'app-popup-confirm',
  imports: [],
  templateUrl: './popup-confirm.html',
  styleUrl: './popup-confirm.css',
})
export class PopupConfirm {
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

  delete() {
    this.showSuccess = true;
  }
}
