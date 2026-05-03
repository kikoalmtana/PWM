import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, query, where, getDocs, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Pass } from '../models/pass.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PassService {
  private firestore = inject(Firestore);
  private passCollection = collection(this.firestore, 'pass');

  getPasses(): Observable<Pass[]> {
    return collectionData(this.passCollection, { idField: 'id' }) as Observable<Pass[]>;
  }

  getPassById(id: string): Observable<Pass> {
    return docData(doc(this.firestore, 'pass', id), { idField: 'id' }) as Observable<Pass>;
  }

  async findByCodigo(codigo: string, tipoBono: string): Promise<Pass | null> {
    const q = query(
      this.passCollection,
      where('codigo', '==', codigo),
      where('tipoBono', '==', tipoBono)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const docSnap = snapshot.docs[0];
    return { id: docSnap.id, ...docSnap.data() } as Pass;
  }

  addPass(pass: Pass) {
    return addDoc(this.passCollection, pass);
  }

  async updatePass(pass: Pass) {
    const ref = doc(this.firestore, `pass/${pass.id}`);
    return updateDoc(ref, { ...pass });
  }

  async deletePass(id: string) {
    const ref = doc(this.firestore, `pass/${id}`);
    return deleteDoc(ref);
  }
}
