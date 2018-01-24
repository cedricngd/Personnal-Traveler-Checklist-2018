import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public profile:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public profileProvider:ProfileProvider) {
    this.profileProvider.getRemoteProfile().subscribe(data=>{
      console.log("profileeeeeee: ",data);
      this.profile=data;
    });;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  private editProfile(){
    
  }

}
