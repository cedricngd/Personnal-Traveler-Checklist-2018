import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {
trip:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("coucou");
      this.trip = navParams.get('tasks'); // get the trip name from trip.ts
      console.log(this.trip);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksPage');
  }

}
