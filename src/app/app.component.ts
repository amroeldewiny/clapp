import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { AuthenticationService } from './services/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private auth: AuthenticationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.auth.authState.subscribe(state => {
        if (state) {
          console.log(state, ' From home auth true');
          //this.router.navigateByUrl('home');
          this.router.navigate(['home']);
        } else {
          //this.router.navigateByUrl('sign-in');
          this.router.navigate(['sign-in']);
          console.log(state, ' From sign-in auth false');
        }
      })
    });
  }
}
