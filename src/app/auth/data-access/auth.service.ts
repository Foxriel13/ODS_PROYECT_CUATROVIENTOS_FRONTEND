import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  authState,
  connectAuthEmulator,
  signOut
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth)
  private provider = new GoogleAuthProvider()

  constructor() { }

  signUp(email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  signIn(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  signInWithGoogle(){
    return signInWithPopup(this.auth, this.provider)
  }

  signOut(){
    signOut(this.auth)
  }

  getAuthState(): Observable<any>{
    return authState(this.auth)
  }
}
