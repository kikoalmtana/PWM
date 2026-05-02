import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PassInfoComponent } from '../../components/pass-info/pass-info';
import { PopupConfirm } from '../../components/popup-confirm/popup-confirm';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-info',
  imports: [RouterLink, PassInfoComponent, PopupConfirm],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css',
})
export class UserInfo {
  private authService = inject(AuthService);
  private router = inject(Router);

  async onLogout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
