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
  trips:any[];
  arrival:any;
  departure:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public tripsProvider:TripsProvider) {
      this.trips= [];
      console.log("toooooooooooooooooooooo");
      console.log(this.tripsProvider.getRemoteTrips());

      this.tripsProvider.getRemoteTrips().subscribe(data=>{
            console.log(data);
            this.trips=data;
            this.departure=this.trips[0].departure_airport;
            this.arrival=this.trips[0].arrival_airport;
            console.log(this.departure);
          });

      }
      /*console.log(this.trips[0].arrival_airport);

      for (let i= 0; i < 10;i++){
          this.trips.push({
            text:'trip' + i,
            id:i
          })
      };
      console.log(this.trips);

  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripPage');
    //this.tripsProvider.getRemoteTrips();
  }

  tripSelected(trip){
    this.navCtrl.push(TripTaskPage,
    {param1:"toto"}); // go to TripTaskPage and send variable trips
  }

}
