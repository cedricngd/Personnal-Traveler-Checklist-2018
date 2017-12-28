import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TasksProvider } from '../../providers/tasks/tasks';

/**
 * Generated class for the TripTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip-task',
  templateUrl: 'trip-task.html',
})
export class TripTaskPage {
  trip:any;
  departure:any;
  arrival:any;
  tasks:any;



  constructor(public navCtrl: NavController, public navParams: NavParams,
    public tasksProvider:TasksProvider) {

      this.trip = navParams.get('trip'); // get the trip name from trip.ts

      this.departure = this.trip.departure_country;
      this.arrival = this.trip.arrival_country;
      let id=this.trip.id;

      /*
      if (id==1)
        this.generateTasks(id);
        */
      //-----------

      this.getTasksForThisTrip(id);

  }

  ionViewDidLoad() {
  }

  getTasksForThisTrip(id){
  this.tasksProvider.getRemoteTasks(id).subscribe(data=>{
          this.tasks=data;console.log(data);
          console.log("getTask...");
        });
  }

  //regenerate automatic tasks if they have been deleted by the user but he wants them back
  generateTasks(id){
    this.tasksProvider.generateRemoteTasks(id).subscribe( data=>{
      console.log("generating tasks");
    });
  }

}
