import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc, arrayUnion, arrayRemove, docData } from '@angular/fire/firestore';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private firestore = inject(Firestore);
  private users = collection(this.firestore, 'users');

  getUsers(): Observable<UserModel[]> {
    return collectionData(this.users, { idField: 'uid' }) as Observable<UserModel[]>;
  }

  getUserProfile(uid: string): Observable<UserModel> {
    return docData(doc(this.firestore, 'users', uid)) as Observable<UserModel>;
  }

  async addBonoToUser(uid: string, bonoId: string) {
    const userRef = doc(this.firestore, 'users', uid);
    await updateDoc(userRef, { bonosIds: arrayUnion(bonoId) });
  }

  async removeBonoFromUser(uid: string, bonoId: string) {
    const userRef = doc(this.firestore, 'users', uid);
    await updateDoc(userRef, { bonosIds: arrayRemove(bonoId) });
  }
}
