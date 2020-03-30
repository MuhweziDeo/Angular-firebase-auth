import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  async sigInWithEmailAndPassword(email: string, password: string): Promise<any> {
    const response = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    console.log(response);
    return response;
  }

  async googleLogin(): Promise<any> {
    const response = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    return response;
  }
}
