import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinesService } from '../../services/lines.service';
import { Linea } from '../../models/lines.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../../components/header/header';
import { Heading } from '../../components/heading/heading';
import { LinesWarnings } from '../../components/lines-warnings/lines-warnings';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-lines',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, FormsModule, HeaderComponent, Heading, LinesWarnings],
  templateUrl: './lines.page.html',
  styleUrl: './lines.page.scss',
})
export class LinesPage {
  private linesService = inject(LinesService);
  private databaseService = inject(DatabaseService);

  lineas = toSignal(this.linesService.getLineas(), { initialValue: [] as Linea[] });

  searchTerm = '';
  favoriteIds = new Set<string>();
  favoriteLoadingIds = new Set<string>();

  async ionViewWillEnter() {
    await this.loadFavoriteIds();
  }

  get lineasFiltradas(): Linea[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.lineas();
    return this.lineas().filter((l: Linea) =>
      l.numero.toString().includes(term) ||
      l.primera_salida.toLowerCase().includes(term) ||
      l.segunda_salida.toLowerCase().includes(term)
    );
  }

  isFavorite(linea: Linea): boolean {
    return !!linea.id && this.favoriteIds.has(linea.id);
  }

  isFavoriteLoading(linea: Linea): boolean {
    return !!linea.id && this.favoriteLoadingIds.has(linea.id);
  }

  async toggleFavorite(event: Event, linea: Linea) {
    event.preventDefault();
    event.stopPropagation();
    if (!linea.id || this.favoriteLoadingIds.has(linea.id)) return;

    this.favoriteLoadingIds.add(linea.id);
    try {
      if (this.favoriteIds.has(linea.id)) {
        await this.databaseService.removeFavorite(linea.id);
      } else {
        await this.databaseService.addFavorite(linea);
      }

      await this.loadFavoriteIds();
    } finally {
      this.favoriteLoadingIds.delete(linea.id);
    }
  }

  private async loadFavoriteIds() {
    const favorites = await this.databaseService.getFavorites();
    this.favoriteIds = new Set(favorites.map(linea => linea.id).filter((id): id is string => !!id));
  }
}
