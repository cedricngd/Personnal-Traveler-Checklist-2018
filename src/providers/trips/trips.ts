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
  //  console.log('Hello TripsProvider Provider');
  }

    public getRemoteTrips(){
      var baseUrl1 = 'http://127.0.0.1:8000/';
      var baseUrl2= 'http://192.168.43.32:8000/'
      var baseUrl3= 'http://138.195.202.5:8000/'

      var baseUrl4='http://10.1.242.16/' // ip local guest

      var tripUrl= 'trips/'

      return this.http.get(baseUrl1+tripUrl).map(res => res.json());

    }
    public setRemoteTrip(){

      //this.http.post(baseUrl1+tripUrl,form)
    }
}
