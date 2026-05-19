import {Injectable} from '@angular/core';
import {Capacitor} from '@capacitor/core';
import {CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from '@capacitor-community/sqlite';
import {Linea} from "../models/lines.model";
import {Platform} from '@ionic/angular';
import {Auth, onAuthStateChanged} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root',
})
export class DatabaseService {


  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private isWeb: boolean = false;
  private readonly STORAGE_KEY = 'favorites';
  private readonly STORAGE_DB = 'favoritesDB';
  private readonly TABLE_NAME = 'favorite_lines';
  private initPromise: Promise<void>;

  //favoritesChanged = new BehaviorSubject<void>(undefined);

  constructor(private platform: Platform, private auth: Auth) {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.initPromise = this.init();
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
          CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
            userId TEXT NOT NULL,
            id TEXT NOT NULL,
            numero INTEGER,
            primera_salida TEXT,
            segunda_salida TEXT,
            horarios TEXT,
            paradas TEXT,
            PRIMARY KEY (userId, id)
          );
        `);
      } catch (error) {
        console.error('Error opening SQLite database', error);
      }
    }
  }

  private async getUserId(): Promise<string | null> {
    if (this.auth.currentUser) return this.auth.currentUser.uid;

    return new Promise(resolve => {
      const unsubscribe = onAuthStateChanged(this.auth, user => {
        unsubscribe();
        resolve(user?.uid ?? null);
      });
    });
  }

  private getStorageKey(userId: string): string {
    return `${this.STORAGE_KEY}:${userId}`;
  }

  async addFavorite(item: Linea): Promise<void> {
    await this.initPromise;
    const userId = await this.getUserId();
    if (!userId || !item.id) return;

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

        localStorage.setItem(this.getStorageKey(userId), JSON.stringify(favorites));
        //this.favoritesChanged.next();
      }
    } else if (this.db) {
      await this.db.run(
        `INSERT OR REPLACE INTO ${this.TABLE_NAME}
          (userId, id, numero, primera_salida, segunda_salida, horarios, paradas)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
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
    await this.initPromise;
    const userId = await this.getUserId();
    if (!userId) return;

    if (this.isWeb) {
      const favorites = await this.getFavorites();
      const updatedFavorites = favorites.filter((fav: any) => fav.id !== id);
      localStorage.setItem(this.getStorageKey(userId), JSON.stringify(updatedFavorites));
      //this.favoritesChanged.next();
    } else if (this.db) {
      await this.db.run(`DELETE FROM ${this.TABLE_NAME} WHERE userId = ? AND id = ?`, [userId, id]);
      //this.favoritesChanged.next();
    }
  }

  async getFavorites(): Promise<Linea[]> {
    await this.initPromise;
    const userId = await this.getUserId();
    if (!userId) return [];

    if (this.isWeb) {
      const stored = localStorage.getItem(this.getStorageKey(userId));
      return stored ? JSON.parse(stored) : [];
    } else if (this.db) {
      const res = await this.db.query(`SELECT * FROM ${this.TABLE_NAME} WHERE userId = ?`, [userId]);
      return (res.values ?? []).map((item: any) => ({
        ...item,
        horarios: typeof item.horarios === 'string' ? JSON.parse(item.horarios) : item.horarios,
        paradas: typeof item.paradas === 'string' ? JSON.parse(item.paradas) : item.paradas
      }));
    }
    return [];
  }

  async isFavorite(id: string): Promise<boolean> {
    await this.initPromise;
    const userId = await this.getUserId();
    if (!userId) return false;

    if (this.isWeb) {
      const favorites = await this.getFavorites();
      return favorites.some((fav: any) => fav.id === id);
    } else if (this.db) {
      const res =
        await this.db.query(`SELECT id FROM ${this.TABLE_NAME} WHERE userId = ? AND id = ?`, [userId, id]);
      //return res.values?.length > 0 ?? false;
      return !!(res.values && res.values.length > 0);
    }

    return false;
  }

  async clearFavorites(): Promise<void> {
    await this.initPromise;
    const userId = await this.getUserId();
    if (!userId) return;

    if (this.isWeb) {
      localStorage.removeItem(this.getStorageKey(userId));
      //this.favoritesChanged.next();
    } else if (this.db) {
      await this.db.run(`DELETE FROM ${this.TABLE_NAME} WHERE userId = ?`, [userId]);
      //this.favoritesChanged.next();
    }
  }
}
