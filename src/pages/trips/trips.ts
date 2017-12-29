import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController,ToastController, } from 'ionic-angular';
import { TripTaskPage } from '../trip-task/trip-task';
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
    public newTripModal:ModalController, public toastCtrl:ToastController) {
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

  //Message: the trip has been succesfully removed
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'This trip was successfully removed ! ',
      duration: 2000
    });
    toast.present();
  }


  deleteTrip(trip:any){
    this.tripsProvider.deleteRemoteTrip(trip).subscribe(
      data=>{

      this.updateTrips();
      this.presentToast();
      },
      error => {
      console.log("Removing trip failed: ",error);
      }
      );
  }

  refreshTrips(refresher) {
     this.updateTrips();

     setTimeout(() => {
       refresher.complete();
     }, 1000);
   }

}
