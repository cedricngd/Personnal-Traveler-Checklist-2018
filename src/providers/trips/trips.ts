import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class TripsProvider {
  private baseUrl1 = 'http://127.0.0.1:8000/';
  private tripUrl= 'trips/';

  data:any = {};

  constructor(public http: Http) {
  //  console.log('Hello TripsProvider Provider');
  }

    public getRemoteTrips(){
      return this.http.get(this.baseUrl1+this.tripUrl).map(res => res.json());
    }


    public setRemoteTrip(form:any){

      var myData =  {
      traveler_id : "1",
      departure_airport:"CDG",
      departure_country:"France",
      departure_date_time: "2017-12-06T18:00:00Z",
      arrival_airport: "CHA",
      arrival_country: "Italia",
      arrival_date_time: "2017-12-07T09:30:00Z",
      segments: []
      };

    this.http.post(
    this.baseUrl1+this.tripUrl,myData)

    .subscribe(data => {
    this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response

    }, error => {
    console.log("Oooops!"+error);
  });

    }

}
