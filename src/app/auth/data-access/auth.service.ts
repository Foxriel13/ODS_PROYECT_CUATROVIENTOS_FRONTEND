import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  connectAuthEmulator
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth)

  constructor() { }

  signUp(email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password)
  }
}
