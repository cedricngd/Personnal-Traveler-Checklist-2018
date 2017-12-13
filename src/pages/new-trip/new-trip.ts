import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, ViewController,AlertController } from 'ionic-angular';
import { TripsProvider } from '../../providers/trips/trips';

@IonicPage()
@Component({
  selector: 'page-new-trip',
  templateUrl: 'new-trip.html',
})
export class NewTripPage {
  public form={"departureAirport":null,"departureTime":null,
"arrivalAirport":null, "arrivalTime":null}; // JSON to be transfered

  public departureAirport:any;
  public departureDate:any;
  public departureTime:any;
  public arrivalAirport:any;
  public arrivalDate:any;
  public arrivalTime:any;

  constructor(public navCtrl: NavController, private view:ViewController, public tripsProvider:TripsProvider,
  public toastCtrl:ToastController, public alertCtrl: AlertController) {


  }


  // Validation of a new trip
  //TODO possibilité d'aller retour
  validateTrip(){
    this.setTripInformations();

    if (this.form.departureAirport==null||this.form.departureTime==null
      ||this.form.arrivalAirport==null||this.form.arrivalTime==null){
        this.showAlert();
    }
    else{
      this.tripsProvider.setRemoteTrip(this.form);
      this.presentToast();
      this.close();

    }
  }

  setTripInformations(){ //TODO deplacer dans tripsProvider.JSONFormat() pour plus de clareté
    this.form.departureAirport= this.departureAirport;
    this.form.departureTime= this.departureDate+"T"+this.departureTime+"Z"; //ISO8601 time format
    this.form.arrivalAirport= this.arrivalAirport;
    this.form.arrivalTime=  this.arrivalDate+"T"+this.arrivalTime+"Z";      //ISO8601 time format
  }


  // message: Validation OK
  presentToast() { //TODO executer si pas d'erreur d"envoi
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
