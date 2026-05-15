import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header';
import { Linea } from 'src/app/models/lines.model';
import { Subscription } from 'rxjs/internal/Subscription';
import {Router} from "@angular/router";
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export class FavoritesPage implements OnDestroy {

  private databaseService = inject(DatabaseService);
  private router = inject(Router);

  favorites: Linea[] = [];
  private favoritesSub: Subscription | undefined;



  async ionViewWillEnter() {
    //await this.clearFavorites();
    await this.loadFavorites();

  }

  async loadFavorites() {
    this.favorites = await this.databaseService.getFavorites();

    console.log("favorites: ", JSON.stringify(this.favorites));
  }

  async removeFromFavorites(id: string) {
    await this.databaseService.removeFavorite(id);
    await this.loadFavorites();
  }

  async clearFavorites() {
    await this.databaseService.clearFavorites();
    await this.loadFavorites(); // Volvemos a cargar (lista vacía)
  }

  ngOnDestroy() {
    if (this.favoritesSub) {
      this.favoritesSub.unsubscribe();
    }
  }


  goToDetail(id: string) {
    // Implementa la navegación al detalle
    this.router.navigate(['/detail', id]);
  }

}
