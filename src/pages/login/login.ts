import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthentificationProvider } from '../../providers/authentification/authentification';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authProvider: AuthentificationProvider) {
  }

  public showTrips(){
    this.navCtrl.push(TabsPage);
  }

}
