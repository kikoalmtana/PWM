import { Injectable, inject} from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, docData } from '@angular/fire/firestore';
import { New } from '../models/new.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewService {
  private firestore = inject(Firestore);
  private news = collection(this.firestore, 'new');

  // función para leer los libros de la base de datos
  getNews(): Observable<New[]> {
    return collectionData(this.news, {idField: 'id'}) as Observable<New[]>;
  }

  // función para añadir un libro a la base de datos
  async addNews(noticia: New) {
    return addDoc(this.news, noticia);
  }

  // función para actualizar un libro de la base de datos
  updateNew(noticia: New) {
    const docRef = doc(this.firestore, `new/${noticia.id}`);
    return updateDoc(docRef, { ...noticia });
  }

  // función para eliminar un libro de la base de datos
  deleteNew(id: string) {
    const docRef = doc(this.firestore, `new/${id}`);
    return deleteDoc(docRef);
  }
}
