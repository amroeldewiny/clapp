import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  signup = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  });

  constructor(private router: Router, public authService: AuthService ) { }

  ngOnInit() {
  }


  signupForm() {

    let email = this.signup.value.email;
    let password = this.signup.value.password;
    this.authService.register(email, password).then(res => {
      this.router.navigateByUrl('home');
    }, (error) => {
      console.log(error)
    })
  }

}
