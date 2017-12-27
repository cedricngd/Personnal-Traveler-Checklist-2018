import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
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
      return this.http.get(this.baseUrl1+this.tripUrl);
    }

    //send the trip to the server
    public setRemoteTrip(form:any){

      this.data =  this.JSONFormat(form);
      console.log("j'envoie ca: ", this.data)
      this.http.post(this.baseUrl1+this.tripUrl,this.data,{headers:this.authProvider.createHeader()})
      .subscribe(data => {
      this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
      console.log("post du setremotetrip: ",data["_body"]);
      }, error => {
      console.log("Trips post request failed: ",error);
    });

    }

    // Format the data to be accepted by the server
    private JSONFormat(form:any){

      let departureTime = form.departureDate+"T"+form.departureTime+"Z";
      let arrivalTime =  form.arrivalDate+"T"+form.arrivalTime+"Z";

      let DepartureCountry_IATA=form.departureAirport.split("-");
      let ArrivalCountry_IATA=form.arrivalAirport.split("-");

      return {
      traveler_id : "1",
      departure_airport:DepartureCountry_IATA[1],
      departure_country:DepartureCountry_IATA[0],
      departure_date_time: departureTime,
      arrival_airport: ArrivalCountry_IATA[1],
      arrival_country: ArrivalCountry_IATA[0],
      arrival_date_time: arrivalTime,
      segments: []
      };
    }

}

/*
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AuthentificationProvider } from '../../providers/authentification/authentification';

@Injectable()
export class TripsProvider {
  private baseUrl1 = 'http://127.0.0.1:8000/';
  private tripUrl= 'trips/';

  data:any = {};

  constructor(public http:Http,  public authProvider: AuthentificationProvider) {
  }
    // retreive the trips from the server
    public getRemoteTrips(){
      return this.http.get(this.baseUrl1+this.tripUrl).map(res => res.json());
    }

    //send the trip to the server
    public setRemoteTrip(form:any,token:any){

      this.data =  this.JSONFormat(form);
      this.http.post(this.baseUrl1+this.tripUrl,this.data )
      .subscribe(data => {
      this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
      console.log(data["_body"]);
      }, error => {
      console.log("Trips post request failed: "+error);
    });

    }

    // Format the data to be accepted by the server
    private JSONFormat(form:any){

      let DepCountryIATA=form.departureAirport.split("-");
      let ArrCountryIATA=form.arrivalAirport.split("-");

      return {
      traveler_id : "1",//TODO remove
      departure_airport:DepCountryIATA[1],
      departure_country:DepCountryIATA[0],
      departure_date_time: form.departureTime,
      arrival_airport: ArrCountryIATA[1],
      arrival_country: ArrCountryIATA[0],
      arrival_date_time: form.arrivalTime,
      segments: []
      };
    }

}
*/
