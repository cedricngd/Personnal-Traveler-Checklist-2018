import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthentificationProvider } from '../../providers/authentification/authentification';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authProvider: AuthentificationProvider) {

    this.requestToken();//assuming the user entered correct credentials, but not implemented TODO
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public showTrips(){
    this.navCtrl.push(TabsPage);
  }

  requestToken(){
    this.authProvider.requestToken();
  }
}
