import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: User;

  authState = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private platform: Platform,
    private toastCtl: ToastController,
    private afAuth: AngularFireAuth,
  ) {
    // add and remove user from localStorage
    this.afAuth.authState.subscribe(user => {
      console.log(user + ' From Authentication service')
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.authState.next(true);
      } else {
        localStorage.setItem('user', null);
        this.authState.next(false);
      }
    })
  } // End constrmctor
  
   // add register or sign up
    async register(email: string, password: string) {
        try {
          await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(() => {
            this.authState.next(true);
            this.router.navigate(['home']);
            })
        } catch (error) {
            alert('Error! ' + error.massage);
        }
    }

    // add login or signin method
    async login(email: string, password: string) {
        try {
          await this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
            this.authState.next(true);
            this.router.navigate(['home']);
            })
        } catch (error) {
            alert('Error! ' + error.massage);
        }
    }
  // add logout 
  async logout() {
    try {
      await this.afAuth.auth.signOut();
      localStorage.removeItem('user');
      this.authState.next(false);
      this.router.navigate(['sign-in']);
    } catch (error) {
      alert('Error! ' + error.massage);
    }
  }

  isAuthenticated() {
    return this.authState.value;
  }
}
