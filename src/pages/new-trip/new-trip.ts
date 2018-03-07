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
  public form={"departureCountry":null,"departureDate":null,"departureTime":null,
                "arrivalCountry":null,"arrivalDate":null ,"arrivalTime":null}; // JSON to be transfered
  //public data=[];

  public departureCountry:any;
  public departureDate:any;
  public departureTime:any;
  public arrivalCountry:any;
  public arrivalDate:any;
  public arrivalTime:any;

  public countries: any[];

  constructor(public navCtrl: NavController, private view:ViewController, params: NavParams,
  public tripsProvider:TripsProvider,public toastCtrl:ToastController, public alertCtrl: AlertController) {
    this.countries=[];
    this.tripsProvider.getCountries().subscribe(data=>{
      var countriesList:any;
      countriesList=data;
      for(let i =0;i<countriesList.length;i++){
        this.countries.push(countriesList[i].name);
      }
    });

  }

  // Validation of a new trip
  validateTrip(){  //TODO possibilité d'aller retour
    this.form.arrivalCountry=this.arrivalCountry;
    this.form.arrivalDate=this.arrivalDate;
    this.form.arrivalTime=this.arrivalTime;
    this.form.departureCountry=this.departureCountry;
    this.form.departureDate=this.departureDate;
    this.form.departureTime=this.departureTime;
    console.log("aaaaaaaaaaaaaaaaaaaaaaa", this.form);
    if (this.form.departureCountry==null||this.form.departureTime==null //TODO rendre plus "joli"
      ||this.form.departureDate==null||this.form.arrivalCountry==null
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
