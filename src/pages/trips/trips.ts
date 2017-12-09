import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { TripTaskPage } from '../trip-task/trip-task';
import { NewTripPage } from '../new-trip/new-trip';

import { TripsProvider } from '../../providers/trips/trips';

@IonicPage()
@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html',
})
export class TripsPage {
  public trips:any[];



  constructor(public navCtrl: NavController,
    public tripsProvider:TripsProvider, public newTripModal:ModalController) {
      this.trips= [];

      this.tripsProvider.getRemoteTrips().subscribe(data=>{
            this.trips=data;
          });
      }

      /*
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

  showTasks(trip){
    this.navCtrl.push(TripTaskPage,{
      trip:trip
    });
  }

  addTrip(){
    let modal= this.newTripModal.create('NewTripPage');
    modal.present();
    console.log("tooooooooooooooooooooooooooooo")
  }

}
