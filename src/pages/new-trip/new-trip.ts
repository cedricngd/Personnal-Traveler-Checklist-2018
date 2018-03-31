import { Component } from '@angular/core';
import { IonicPage,NavParams, NavController, ViewController
  ,AlertController,LoadingController } from 'ionic-angular';
import { TripsProvider } from '../../providers/trips/trips';


@IonicPage()
@Component({
  selector: 'page-new-trip',
  templateUrl: 'new-trip.html',
})
export class NewTripPage {
  public form={"departureCountry":null,"departureDate":null,"departureTime":null,
                "arrivalCountry":null,"arrivalDate":null ,"arrivalTime":null}; // JSON to be transfered

  public departureCountry:any;
  public departureDate:any;
  public departureTime:any;
  public arrivalCountry:any;
  public arrivalDate:any;
  public arrivalTime:any;

  public countries: any[];

  constructor(public navCtrl: NavController, private view:ViewController, params: NavParams,
  public tripsProvider:TripsProvider, public alertCtrl: AlertController,
public loadingCtrl: LoadingController) {
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
  validateTrip(){
    this.form.arrivalCountry=this.arrivalCountry;
    this.form.arrivalDate=this.arrivalDate;
    this.form.arrivalTime=this.arrivalTime;
    this.form.departureCountry=this.departureCountry;
    this.form.departureDate=this.departureDate;
    this.form.departureTime=this.departureTime;

    if (this.form.departureCountry==null||this.form.departureTime==null
      ||this.form.departureDate==null||this.form.arrivalCountry==null
      ||this.form.arrivalTime==null||  this.form.arrivalDate==null){
        this.showAlert();
    }
    else{
      let data:any;
      data =  this.tripsProvider.JSONFormat(this.form);
      let loading=this.presentLoading();
      this.tripsProvider.setRemoteTrip(data).subscribe(data => {
        loading.dismiss();
      }, error => {
      console.log("Trips post request failed: ",error);
      });
      this.close();
    }
  }

  // loading while the trip is saved on the server
  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Adding trip to server...'
    });
    let IsStillActive:boolean=true;
    loading.onDidDismiss(() => {
      IsStillActive=false;
    });
    loading.present();

    setTimeout(() => {
      if (IsStillActive){
          loading.dismiss();
          console.error("Cannot contact server, check network connexion");
      }
    }, 10000);
    return loading;
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
