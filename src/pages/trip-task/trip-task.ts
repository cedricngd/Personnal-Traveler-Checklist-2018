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
  trip:any;
  departure:any;
  arrival:any;

  tasks:any[];



  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.trip = navParams.get('trip'); // get the trip name from trip.ts

      this.departure = this.trip.departure_country;
      this.arrival = this.trip.arrival_country;
      this.tasks=this.trip.tasks;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripTaskPage');
  }

}
