import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TasksProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TasksProvider {
  private baseUrl1 = 'http://127.0.0.1:8000/';
  private tripUrl= 'trips/';

  constructor(public http: Http) {
    console.log('Hello TasksProvider Provider');
  }



  public getRemoteTasks(){
    return this.http.get(this.baseUrl1+this.tripUrl).map(res => res.json());
  }
}
