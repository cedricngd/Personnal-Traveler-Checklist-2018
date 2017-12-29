import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { TripTaskPage } from '../trip-task/trip-task';

import { AuthentificationProvider } from '../../providers/authentification/authentification';
import { TripsProvider } from '../../providers/trips/trips';



@IonicPage()
@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html',
})
export class TripsPage {
  public trips:any;
  public token:any;

  constructor(public navCtrl: NavController,public tripsProvider:TripsProvider,
    public authProvider: AuthentificationProvider, public newTripModal:ModalController) {
      this.updateTrips();
      }


  // update the trips page with the trips that has been registered on the API
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

  deleteTrip(trip){
    this.tripsProvider.deleteRemoteTrip(trip).subscribe(data=>{
      this.updateTrips();
    });



  }

}
