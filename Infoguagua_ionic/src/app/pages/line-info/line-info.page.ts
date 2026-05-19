import { Component, Injector, effect, inject, runInInjectionContext, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { switchMap, map, filter } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Linea } from '../../models/lines.model';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-line-info',
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent],
  templateUrl: './line-info.page.html',
  styleUrl: './line-info.page.scss',
})
export class LineInfoPage {
  private injector = inject(Injector);
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  private databaseService = inject(DatabaseService);

  seccionAbierta = signal<string | null>(null);
  isFavorite = signal(false);
  favoriteLoading = signal(false);

  linea = toSignal<Linea | null>(
    this.route.queryParams.pipe(
      map(params => params['id'] as string),
      filter(id => !!id),
      switchMap(id => {
        return runInInjectionContext(this.injector, () => {
          const ref = doc(this.firestore, 'lineas', id);
          return docData(ref).pipe(
            map(data => ({ ...data, id } as Linea))
          );
        });
      })
    ),
    { initialValue: null }
  );

  constructor() {
    effect(() => {
      const line = this.linea();
      void this.loadFavoriteState(line?.id);
    });
  }

  toggle(seccion: string) {
    this.seccionAbierta.set(this.seccionAbierta() === seccion ? null : seccion);
  }

  isOpen(seccion: string): boolean {
    return this.seccionAbierta() === seccion;
  }

  async toggleFavorite(event: Event, linea: Linea) {
    event.stopPropagation();
    if (!linea.id || this.favoriteLoading()) return;

    this.favoriteLoading.set(true);
    try {
      const shouldBeFavorite = !this.isFavorite();

      if (shouldBeFavorite) {
        await this.databaseService.addFavorite(linea);
      } else {
        await this.databaseService.removeFavorite(linea.id);
      }

      this.isFavorite.set(await this.databaseService.isFavorite(linea.id));
    } finally {
      this.favoriteLoading.set(false);
    }
  }

  private async loadFavoriteState(id?: string) {
    if (!id) {
      this.isFavorite.set(false);
      return;
    }

    this.isFavorite.set(await this.databaseService.isFavorite(id));
  }
}
