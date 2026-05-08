import {inject, Injectable} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword, deleteUser,
  signInWithEmailAndPassword,
  signOut,
  user
} from '@angular/fire/auth';
import {UserModel} from '../models/user.model';
import {doc, Firestore, setDoc, docData, deleteDoc} from '@angular/fire/firestore';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  currentUser$ = user(this.auth);

  currentUserProfile$: Observable<UserModel | null> = this.currentUser$.pipe(
    switchMap(user => {
      if (!user) return of(null);
      return docData(doc(this.firestore, 'users', user.uid)) as Observable<UserModel>;
    })
  );


  async register(email: string, password: string, name: string) {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);

    const userDoc: UserModel = {
      uid: credential.user.uid,
      email: credential.user.email!,
      displayName: name,
      role: 'user',
    };

    await setDoc(doc(this.firestore, 'users', credential.user.uid), userDoc);
    return credential;
  }

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    return await signOut(this.auth);
  }

  async deleteAccount() {
    const currentUser = this.auth.currentUser;
    if (!currentUser) return;

    const uid = currentUser.uid;

    await deleteUser(currentUser);
    await deleteDoc(doc(this.firestore, 'users', uid));
  }
}
