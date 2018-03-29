import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthentificationProvider } from '../providers/authentification/authentification';


import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 rootPage:any = LoginPage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public authProvider: AuthentificationProvider) {
    platform.ready().then(() => {
      this.authProvider.requestToken();//get the identification token to make requests to the server
      statusBar.styleDefault();
      //splashScreen.show();
      splashScreen.hide();
    });
  }

}
