import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TripTaskPage } from '../trip-task/trip-task';
import { TripsProvider } from '../../providers/trips/trips';
//import { TasksPage } from '../tasks/tasks';

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
  //arrival:any[];
  //departure:any[];


  constructor(public navCtrl: NavController, public navParams: NavParams, public tripsProvider:TripsProvider) {
      this.trips= [];
      //this.departure= [];
      //this.arrival= [];

      this.tripsProvider.getRemoteTrips().subscribe(data=>{
            this.trips=data;


            /*
            for (let i=0;i<this.trips.length;i++){
              this.departure[i]=this.trips[i].departure_country;
              this.arrival[i]=this.trips[i].arrival_country;
            }
*/
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
  }

  tripSelected(trip){
    console.log(trip);
/*
    this.navCtrl.push(TripTaskPage,{
      tasks:"toto"
    }); // go to TripTaskPage and send variable trips
    */
    this.navCtrl.push(TripTaskPage,{
      trip:trip
    });
  }

}
