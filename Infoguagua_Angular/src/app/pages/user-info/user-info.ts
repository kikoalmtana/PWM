import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PassInfoComponent } from '../../components/pass-info/pass-info';
import { PopupConfirm } from '../../components/popup-confirm/popup-confirm';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user';
import { PassService } from '../../services/pass';
import { Pass } from '../../models/pass.model';
import { CommonModule } from '@angular/common';
import { switchMap, combineLatest, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-info',
  imports: [RouterLink, PassInfoComponent, PopupConfirm, CommonModule],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css',
})
export class UserInfo {
  authService = inject(AuthService);
  private userService = inject(UserService);
  private passService = inject(PassService);
  private router = inject(Router);

  bonos = toSignal<Pass[], Pass[]>(
    this.authService.currentUser$.pipe(
      switchMap(user => {
        if (!user) return of([]);
        return this.userService.getUserProfile(user.uid).pipe(
          switchMap(perfil => {
            const ids: string[] = perfil.bonosIds ?? [];
            if (ids.length === 0) return of([]);
            return combineLatest(ids.map(id => this.passService.getPassById(id)));
          })
        );
      })
    ),
    { initialValue: [] as Pass[] }
  );

  async eliminarBono(bonoId: string) {
    const user = await new Promise<any>(resolve =>
      this.authService.currentUser$.subscribe(u => resolve(u))
    );
    if (user) await this.userService.removeBonoFromUser(user.uid, bonoId);
  }

  async onLogout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
