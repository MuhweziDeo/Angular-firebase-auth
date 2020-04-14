import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user: Observable<User>;
  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore
  ) {

    this.$user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user)  {
          return this.afs.doc(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );

  }

  async sigInWithEmailAndPassword(email: string, password: string): Promise<any> {
    const response = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return response;
  }

  async googleLogin(): Promise<any> {
    const response = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    return response;
  }

  async createUser({email, password, username}): Promise<any> {
    const response = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    await response.user.sendEmailVerification();
    const data = {
      uid: response.user.uid,
      email,
      username,
      isAdmin: false,
      avatar: 'https://i.pravatar.cc/300'

    };
    return this.updateUser(data, response.user.uid);
  }

  async updateUser(data: User, uid: string): Promise<any> {
    const userRef =  this.afs.doc(`users/${uid}`);
    return userRef.set(data, {merge: true});
  }

  async sendPasswordResetEmail(email: string): Promise<any> {
    const response = await this.afAuth.auth.sendPasswordResetEmail(email);
    return response;
  }
}
