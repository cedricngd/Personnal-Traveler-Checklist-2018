import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { TripTaskPage } from '../trip-task/trip-task';


import { TripsProvider } from '../../providers/trips/trips';
import { AuthentificationProvider } from '../../providers/authentification/authentification';


@IonicPage()
@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html',
})
export class TripsPage {
  public trips:any[];
  public token:any;

  constructor(public navCtrl: NavController,public tripsProvider:TripsProvider,
    public authProvider: AuthentificationProvider, public newTripModal:ModalController) {
      this.trips= [];
      this.getToken();

      this.updateTrips();
      }



  updateTrips(){
    this.tripsProvider.getRemoteTrips().subscribe(data=>{
          this.trips=data;
            });
  }

  getToken(){
    this.authProvider.getToken()
      .map(returnedValue=>returnedValue.json())
      .subscribe(
        (data: any) => {
          this.token=data;
          console.log("on a le token",data);
        }
      );
  }

  showTasks(trip){
    this.navCtrl.push(TripTaskPage,{
      trip:trip
    });
  }

  addTrip(){
    let modal= this.newTripModal.create('NewTripPage',{token:this.token});
    modal.onDidDismiss(() => {
      this.updateTrips();
    });
    modal.present();

  }

}
