import { Injectable, Injector, inject, runInInjectionContext } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Linea } from '../models/lines.model';

@Injectable({
  providedIn: 'root'
})
export class LinesService {
  private injector = inject(Injector);
  private firestore = inject(Firestore);
  private collectionName = 'lineas';

  getLineas(): Observable<Linea[]> {
    return runInInjectionContext(this.injector, () => {
      const ref = collection(this.firestore, this.collectionName);
      return collectionData(ref, { idField: 'id' }) as Observable<Linea[]>;
    });
  }

  addLinea(linea: Linea) {
    const ref = collection(this.firestore, this.collectionName);
    return addDoc(ref, linea);
  }

  deleteLinea(id: string) {
    const ref = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(ref);
  }
}
