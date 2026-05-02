// pass.service.ts
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Pass } from '../models/pass.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class PassService {
  private firestore = inject(Firestore);
  private passCollection = collection(this.firestore, 'pass');

  getPasses(): Observable<Pass[]> {
    return collectionData(this.passCollection, { idField: 'id' }) as Observable<Pass[]>;
  }

  addPass(pass: Pass) {
    return addDoc(this.passCollection, pass);
  }

  updatePass(pass: Pass) {
    const passDocRef = doc(this.firestore, `pass/${pass.id}`);
    return updateDoc(passDocRef, { ...pass });
  }

  deletePass(id: string) {
    const passDocRef = doc(this.firestore, `pass/${id}`);
    return deleteDoc(passDocRef);
  }
}
