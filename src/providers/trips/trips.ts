import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class TripsProvider {
  private baseUrl1 = 'http://127.0.0.1:8000/';
  private tripUrl= 'trips/';

  data:any = {};

  constructor(public http: Http) {
  }
    // retreive the trips from the server
    public getRemoteTrips(){
      return this.http.get(this.baseUrl1+this.tripUrl).map(res => res.json());
    }

    //send the trip to the server
    public setRemoteTrip(form:any,token:any){

      this.data =  this.JSONFormat(form);
      this.http.post(this.baseUrl1+this.tripUrl,this.data)
      .subscribe(data => {
      this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
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
