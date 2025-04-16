import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ring-of-fire-e6edf',
        appId: '1:311301486456:web:dcd3c1738161d8f9d6fa8d',
        storageBucket: 'ring-of-fire-e6edf.firebasestorage.app',
        apiKey: 'HIDDEN',
        authDomain: 'ring-of-fire-e6edf.firebaseapp.com',
        messagingSenderId: '311301486456',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
