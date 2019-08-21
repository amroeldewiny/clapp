import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase'; 

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  user: User;

  signup = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  });

  constructor(private router: Router, public afAuth: AngularFireAuth ) { }

  ngOnInit() {
  }

  async signupForm() {
    try {
      console.log(this.signup);
      let email = this.signup.value.email;
      let password = this.signup.value.password;

      await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      this.router.navigateByUrl('home');
    } catch (error) {
      console.log(error);
    }
    console.log(this.signup);
    let email = this.signup.value.email;
    let password = this.signup.value.password;
    this.router.navigateByUrl('home');
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }

}
