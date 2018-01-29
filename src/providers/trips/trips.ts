import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthentificationProvider } from '../../providers/authentification/authentification';

@Injectable()
export class TripsProvider {
  private baseUrl1 = 'http://127.0.0.1:8000/';
  private tripUrl= 'trips/';

  data:any = {};

  constructor(public http:HttpClient,  public authProvider: AuthentificationProvider) {
  }

  // retreive the trips from the server
  public getRemoteTrips(){
    return this.http.get(this.baseUrl1+this.tripUrl,{headers:this.authProvider.createHeader()});
  }

  //send the trip to the server
  public setRemoteTrip(form:any){
    this.data =  this.JSONFormat(form);
    this.http.post(this.baseUrl1+this.tripUrl,this.data,{headers:this.authProvider.createHeader()})
    .subscribe(data => {
      this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
    }, error => {
    console.log("Trips post request failed: ",error);
    })
  }

  public deleteRemoteTrip(trip:any){
    let ret=this.http.delete(this.baseUrl1+"trips/"+trip.id+"/",{headers:this.authProvider.createHeader()})
    console.log(ret);
    return ret;
  }


  // Format the data to be accepted by the server
  private JSONFormat(form:any){
    let departureTime = form.departureDate+"T"+form.departureTime+"Z";
    let arrivalTime =  form.arrivalDate+"T"+form.arrivalTime+"Z";

    let DepartureCountry_IATA=form.departureAirport.split("-");
    let ArrivalCountry_IATA=form.arrivalAirport.split("-");

    return {
      departure_airport:DepartureCountry_IATA[1],
      departure_country:DepartureCountry_IATA[0],
      departure_date_time: departureTime,
      arrival_airport: ArrivalCountry_IATA[1],
      arrival_country: ArrivalCountry_IATA[0],
      arrival_date_time: arrivalTime,
      segments: []
    };
  }

  // Get the list of all countries in the world
  public getCountries(){
    this.http.get("http://127.0.0.1:8000/countries/",{headers:this.authProvider.createHeader()}).subscribe(data=>{
      console.log("countriezsssssss",data);
    });
  }

}
