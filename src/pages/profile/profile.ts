import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public address:any;
  public birth_date:any;
  public nationalities:any;
  public phone:any;
  public residence_country:any;
  public visited_countries:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public profileProvider:ProfileProvider) {
    this.profileProvider.getRemoteProfile().subscribe(data=>{
      let profile:any=data;
      this.address=profile.address;
      this.birth_date=profile.birth_date;
      this.nationalities=profile.nationalities;
      this.phone=profile.phone;
      this.residence_country=profile.residence_country.name;

      let countries:any[]=profile.visited_countries
      this.visited_countries=[];
      for(let i=0;i<countries.length;i++)
        this.visited_countries.push(countries[i].name);

    });
  }

  private editProfile(){

  }

}
