import { Injectable, inject} from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, docData } from '@angular/fire/firestore';
import { Stop } from '../models/stops.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class StopsService {
  private firestore = inject(Firestore);
  private stops = collection(this.firestore, 'stop');

  // función para leer los libros de la base de datos
  getStops(): Observable<Stop[]> {
    return collectionData(this.stops, {idField: 'id'}) as Observable<Stop[]>;
  }

  // función para añadir un libro a la base de datos
  async addStop(stop: Stop) {
    return addDoc(this.stops, stop);
  }

  // función para actualizar un libro de la base de datos
  updateStop(stop: Stop) {
    const docRef = doc(this.firestore, `stop/${stop.id}`);
    return updateDoc(docRef, { ...stop });
  }

  // función para eliminar un libro de la base de datos
  deleteStop(id: string) {
    const docRef = doc(this.firestore, `stop/${id}`);
    return deleteDoc(docRef);
  }
}
