import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../../components/header/header';
import { Heading } from '../../components/heading/heading';
import { Linea } from 'src/app/models/lines.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, HeaderComponent, Heading]
})
export class FavoritesPage {
  private databaseService = inject(DatabaseService);
  private router = inject(Router);

  favorites: Linea[] = [];
  isLoading = false;
  favoriteLoadingIds = new Set<string>();

  async ionViewWillEnter() {
    await this.loadFavorites();
  }

  async loadFavorites() {
    this.isLoading = true;
    this.favorites = await this.databaseService.getFavorites();
    this.isLoading = false;
  }

  isFavoriteLoading(linea: Linea): boolean {
    return !!linea.id && this.favoriteLoadingIds.has(linea.id);
  }

  async toggleFavorite(event: Event, linea: Linea) {
    event.preventDefault();
    event.stopPropagation();
    if (!linea.id || this.favoriteLoadingIds.has(linea.id)) return;

    this.favoriteLoadingIds.add(linea.id);
    await this.databaseService.removeFavorite(linea.id);
    await this.loadFavorites();
    this.favoriteLoadingIds.delete(linea.id);
  }

  async removeFromFavorites(id: string, event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    await this.databaseService.removeFavorite(id);
    await this.loadFavorites();
  }

  async clearFavorites() {
    await this.databaseService.clearFavorites();
    await this.loadFavorites();
  }

  goToDetail(id: string) {
    this.router.navigate(['/line-info'], { queryParams: { id } });
  }
}
