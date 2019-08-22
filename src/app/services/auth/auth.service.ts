import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(public afAuth: AngularFireAuth) { 
    // add and remove user from localStorage
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        console.log('user from service => ' + this.user);
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  } // end constructor
  
  // add login or signin method

  async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      alert('Error! ' + error.massage);
    }
  }
  
}