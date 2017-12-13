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
      }

  ionViewDidLoad() {
        this.updateTrips();
      }

  updateTrips(){
    this.tripsProvider.getRemoteTrips().subscribe(data=>{
          this.trips=data;
            });
}


  showTasks(trip){
    this.navCtrl.push(TripTaskPage,{
      trip:trip
    });
  }

  addTrip(){
    let modal= this.newTripModal.create('NewTripPage');
    modal.onDidDismiss(() => {
      this.updateTrips();
    });
    modal.present();

  }

}
