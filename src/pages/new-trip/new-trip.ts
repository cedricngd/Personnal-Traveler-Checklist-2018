import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, ViewController,AlertController } from 'ionic-angular';
import { TripsProvider } from '../../providers/trips/trips';

@IonicPage()
@Component({
  selector: 'page-new-trip',
  templateUrl: 'new-trip.html',
})
export class NewTripPage {
  public form={"departureAirport":null,"departureDate":null, "arrivalAirport":null, "arrivalDate":null};

  constructor(public navCtrl: NavController, private view:ViewController, public tripsProvider:TripsProvider,
  public toastCtrl:ToastController, public alertCtrl: AlertController) {
  }


  // Validation of a new trip
  addTrip(){
    if (this.form.departureAirport==null||this.form.departureDate==null
      ||this.form.arrivalAirport==null||this.form.arrivalDate==null){

        this.showAlert();

    }
    else{
      this.tripsProvider.setRemoteTrip(this.form);
      console.log(this.form);
      this.close();
      this.presentToast();
    }


  }

  // message: Validation OK
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'This trip was successfully added ! ',
      duration: 3000
    });
    toast.present();
  }

  // alert: all fields must be filled
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Form not completed !',
      subTitle: 'Please fill all the blanks.',
      buttons: ['OK']
    });
    alert.present();
  }

  //to close without register a new trip
  close(){
    this.view.dismiss();
  }
}
