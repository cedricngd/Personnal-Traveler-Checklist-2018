import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthentificationProvider } from '../../providers/authentification/authentification';

@Injectable()
export class TripsProvider {
  public baseUrl = 'http://127.0.0.1:8000/';
  private tripUrl= 'trips/';

  data:any = {};

  constructor(public http:HttpClient,  public authProvider: AuthentificationProvider) {
  }

  // retreive the trips from the server
  public getRemoteTrips(){
    return this.http.get(this.baseUrl+this.tripUrl,{headers:this.authProvider.createHeader()});
  }

  //send the trip to the server
  public setRemoteTrip(form:any){
      return this.http.post(this.baseUrl+this.tripUrl,form,{headers:this.authProvider.createHeader()});
  }


  public deleteRemoteTrip(trip:any){
    let ret=this.http.delete(this.baseUrl+"trips/"+trip.id+"/",{headers:this.authProvider.createHeader()})
    return ret;
  }


  // Format the data to be accepted by the server
  public JSONFormat(form:any){
    let departureTime = form.departureDate+"T"+form.departureTime+"Z";
    let arrivalTime =  form.arrivalDate+"T"+form.arrivalTime+"Z";
    return {
      departure_airport:"xxx",
      departure_country:form.departureCountry,
      departure_date_time: departureTime,
      arrival_airport: "xxx",
      arrival_country: form.arrivalCountry,
      arrival_date_time: arrivalTime,
      segments: []
    };
  }

  // Get the list of all countries in the world
  public getCountries(){
    return this.http.get(this.baseUrl+"countries/",{headers:this.authProvider.createHeader()});

  }

}
