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
                localStorage.setItem('user', JSON.stringify(this.user));
            } else {
                localStorage.setItem('user', null);
            }
        })
    } // end constructor

    // add register or sign up
    async register(email: string, password: string) {
        try {
            await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
        } catch (error) {
            alert('Error! ' + error.massage);
        }
    }

    // add login or signin method
    async login(email: string, password: string) {
        try {
            await this.afAuth.auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            alert('Error! ' + error.massage);
        }
    }

    // add logout 
    async logout() {
        try {
            await this.afAuth.auth.signOut();
            localStorage.removeItem('user');
        } catch (error) {
            alert('Error! ' + error.massage);
        }
    }

}