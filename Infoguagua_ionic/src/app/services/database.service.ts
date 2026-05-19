import {Injectable} from '@angular/core';
import {Capacitor} from '@capacitor/core';
import {CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from '@capacitor-community/sqlite';
import {Linea} from "../models/lines.model";
import {Platform} from '@ionic/angular';


@Injectable({
  providedIn: 'root',
})
export class DatabaseService {


  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private isWeb: boolean = false;
  private readonly STORAGE_KEY = 'favorites';
  private readonly STORAGE_DB = 'favoritesDB';

  //favoritesChanged = new BehaviorSubject<void>(undefined);

  constructor(private platform: Platform) {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.init();
  }

  private async init() {
    await this.platform.ready();
    this.isWeb = Capacitor.getPlatform() === 'web';

    if (!this.isWeb) {
      try {
        const db = await this.sqlite.createConnection(
          this.STORAGE_DB, false, 'no-encryption', 1, false
        );
        await db.open();
        this.db = db;
        await db.execute(`
          CREATE TABLE IF NOT EXISTS favorites (
            id TEXT PRIMARY KEY,
            numero INTEGER,
            primera_salida TEXT,
            segunda_salida TEXT,
            horarios TEXT,
            paradas TEXT
          );
        `);
      } catch (error) {
        console.error('Error opening SQLite database', error);
      }
    }
  }

  async addFavorite(item: Linea): Promise<void> {
    if (this.isWeb) {
      const favorites = await this.getFavorites();
      const exists = favorites.some(fav => fav.id === item.id);
      if (!exists) {

        const favoriteItem = {
          id: item.id,
          numero: item.numero,
          primera_salida: item.primera_salida,
          segunda_salida: item.segunda_salida,
          horarios: item.horarios,
          paradas: item.paradas
        };

        favorites.push(favoriteItem);

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
        //this.favoritesChanged.next();
      }
    } else if (this.db) {
      await this.db.run(
        `INSERT OR REPLACE INTO favorites
          (id, numero, primera_salida, segunda_salida, horarios, paradas)
          VALUES (?, ?, ?, ?, ?, ?)`,
        [
          item.id,
          item.numero,
          item.primera_salida,
          item.segunda_salida,
          JSON.stringify(item.horarios),
          JSON.stringify(item.paradas)
        ]
      );
      //this.favoritesChanged.next();
    }
  }


  async removeFavorite(id: string): Promise<void> {
    if (this.isWeb) {
      const favorites = await this.getFavorites();
      const updatedFavorites = favorites.filter((fav: any) => fav.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedFavorites));
      //this.favoritesChanged.next();
    } else if (this.db) {
      await this.db.run(`DELETE FROM favorites WHERE id = ?`, [id]);
      //this.favoritesChanged.next();
    }
  }

  async getFavorites(): Promise<Linea[]> {
    if (this.isWeb) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } else if (this.db) {
      const res = await this.db.query(`SELECT * FROM favorites`);
      return (res.values ?? []).map((item: any) => ({
        ...item,
        horarios: typeof item.horarios === 'string' ? JSON.parse(item.horarios) : item.horarios,
        paradas: typeof item.paradas === 'string' ? JSON.parse(item.paradas) : item.paradas
      }));
    }
    return [];
  }

  async isFavorite(id: string): Promise<boolean> {
    if (this.isWeb) {
      const favorites = await this.getFavorites();
      return favorites.some((fav: any) => fav.id === id);
    } else if (this.db) {
      const res =
        await this.db.query(`SELECT id FROM favorites WHERE id = ?`, [id]);
      //return res.values?.length > 0 ?? false;
      return !!(res.values && res.values.length > 0);
    }

    return false;
  }

  async clearFavorites(): Promise<void> {
    if (this.isWeb) {
      localStorage.removeItem(this.STORAGE_KEY);
      //this.favoritesChanged.next();
    } else if (this.db) {
      await this.db.execute(`DELETE FROM favorites`);
      //this.favoritesChanged.next();
    }
  }
}
