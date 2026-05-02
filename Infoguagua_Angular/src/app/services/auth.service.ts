import {inject, Injectable} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user
} from '@angular/fire/auth';
import {UserModel} from '../models/user.model';
import {doc, Firestore, setDoc} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  currentUser$ = user(this.auth);

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

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}
