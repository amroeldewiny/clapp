import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  login = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  });

  constructor(private router: Router, public authService: AuthenticationService ) {
  }

  ngOnInit() {
  }

 signinForm() {
    console.log(this.login);

    let email = this.login.value.email;
    let password = this.login.value.password;
   this.authService.login(email, password);
  }

}
