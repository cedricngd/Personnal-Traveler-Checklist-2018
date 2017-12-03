import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TripTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip-task',
  templateUrl: 'trip-task.html',
})
export class TripTaskPage {
  tripName:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.tripName = navParams.get('param1'); // get the trip name from trip.ts
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripTaskPage');
  }

}
