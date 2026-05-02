import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCYeSl1r7bCAuHIbnGT7Pgrq5BpQV_z3NA",
  authDomain: "infoguaguas-eca00.firebaseapp.com",
  projectId: "infoguaguas-eca00",
  storageBucket: "infoguaguas-eca00.firebasestorage.app",
  messagingSenderId: "590666024985",
  appId: "1:590666024985:web:a06af2aaadb4bec77f4288"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ]
};
