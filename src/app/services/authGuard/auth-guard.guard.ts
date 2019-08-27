import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate  {

  constructor(private router: Router, public afAuth: AngularFireAuth ) { }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean>{
    
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        console.log('authGuard service => ' + user);
        if (user) {
          resolve(true);
        } else {
          console.log('User is not sign in');
          this.router.navigate(['sign-in']);
          resolve(false);
        }
      })
    })
  }
  
}
