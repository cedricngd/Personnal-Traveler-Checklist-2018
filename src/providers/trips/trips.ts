import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the TripsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TripsProvider {
  trips:any[];

  constructor(public http: Http) {
    console.log('Hello TripsProvider Provider');
  }

    public getRemoteTrips(){
      var url = 'http://127.0.0.1:8000/trips';
      return this.http.get('http://127.0.0.1:8000/trips').map(res => res.json());


      // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa") ;


      //this.http.get(url).map(res => res.json()).subscribe(trips=>{

      //console.log(data[0].arrival_airport);
      //return trips;
    //});
    }
}
