import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Importar provideHttpClient

import { routes } from './app.routes';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), provideCharts(withDefaultRegisterables()), provideFirebaseApp(() => initializeApp({ projectId: "cuatrovientos-agenda-2030", appId: "1:1081372264341:web:a474937c75a435643e189c", storageBucket: "cuatrovientos-agenda-2030.firebasestorage.app", apiKey: "AIzaSyBceF-jo2ovfwggamRltCHNiA1W-6VcCXc", authDomain: "cuatrovientos-agenda-2030.firebaseapp.com", messagingSenderId: "1081372264341", measurementId: "G-1CZ9QLJ11C" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()) // Proporcionar HttpClient aquí
  ]
};
