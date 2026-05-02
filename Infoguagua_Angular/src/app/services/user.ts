import { Injectable, inject} from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, docData } from '@angular/fire/firestore';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private firestore = inject(Firestore);
  private users = collection(this.firestore, 'users');

  getUsers(): Observable<UserModel[]> {
    return collectionData(this.users, {idField: 'uid'}) as Observable<UserModel[]>;
  }
}
