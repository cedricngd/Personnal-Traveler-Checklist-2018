import { Component } from '@angular/core';
import { IonicPage,NavParams, NavController, ToastController, ViewController
  ,AlertController } from 'ionic-angular';
import { TripsProvider } from '../../providers/trips/trips';

@IonicPage()
@Component({
  selector: 'page-new-trip',
  templateUrl: 'new-trip.html',
})
export class NewTripPage {
  public form={"departureAirport":null,"departureDate":null,"departureTime":null,
                "arrivalAirport":null,"arrivalDate":null ,"arrivalTime":null}; // JSON to be transfered
  public data=[];

  public departureAirport:any;
  public departureDate:any;
  public departureTime:any;
  public arrivalAirport:any;
  public arrivalDate:any;
  public arrivalTime:any;


  constructor(public navCtrl: NavController, private view:ViewController, params: NavParams,
  public tripsProvider:TripsProvider,public toastCtrl:ToastController, public alertCtrl: AlertController) {
    //console.log("new trips: ",params.get(''));
  }


  // Validation of a new trip
  validateTrip(){  //TODO possibilité d'aller retour
    this.form.arrivalAirport=this.arrivalAirport;
    this.form.arrivalDate=this.arrivalDate;
    this.form.arrivalTime=this.arrivalTime;
    this.form.departureAirport=this.departureAirport;
    this.form.departureDate=this.departureDate;
    this.form.departureTime=this.departureTime;

    if (this.form.departureAirport==null||this.form.departureTime==null //TODO rendre plus "joli"
      ||this.form.departureDate==null||this.form.arrivalAirport==null
      ||this.form.arrivalTime==null||  this.form.arrivalDate==null){
        this.showAlert();
    }
    else{
      this.tripsProvider.setRemoteTrip(this.form);
      this.presentToast();//TODO executer si pas d'erreur d"envoi
      this.close();
    }
  }



  // message: Validation OK
  presentToast() { //TODO executer si pas d'erreur d'envoi
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
