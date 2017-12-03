import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TripTaskPage } from '../trip-task/trip-task';
import { TripsProvider } from '../../providers/trips/trips';

/**
 * Generated class for the TripsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html',
})
export class TripsPage {
  trips:[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public tripsProvider:TripsProvider) {

      this.trips = [];
      this.trips = this.tripsProvider.getRemoteTrips();
      console.log("+++++++++++++++++++++++++++++++++++++++");
      console.log(this.trips[0].arrival_airport);

      for (let i= 0; i < this.trips.length;i++){
          this .trips.push({
            text:'trip' + i,
            id:i
          })

      };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripPage');
    this.tripsProvider.getRemoteTrips();
  }

  tripSelected(trip){
    this.navCtrl.push(TripTaskPage,
    {param1:trip.text}); // go to TripTaskPage and send variable trip.text
  }

}
