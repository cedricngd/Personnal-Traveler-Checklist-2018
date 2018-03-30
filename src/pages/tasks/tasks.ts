import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, ModalController } from 'ionic-angular';
import { TasksProvider } from '../../providers/tasks/tasks';
import { TripsProvider } from '../../providers/trips/trips';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {

  eventSource:any  = [];
  viewTitle: string;
  selectedDay = new Date();

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  toDoTasks:any[];
  trips:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public tasksProvider:TasksProvider,  public tripProvider: TripsProvider,
   private alertCtrl: AlertController) {
    this.toDoTasks=[];
    this.trips=[];
  }


  // runs every time the page become active
  ionViewWillEnter (){
    let tripsObservable = this.getTodoTasks(); // get the to-do tasks to be displayed
    let tasksObservable = this.getTrips();     // get the trips

    // both gets must be finished before adding their responses to the calendar
    // but HTTP functions are asynchronous ones
    // so we use forkJoin method
    Observable.forkJoin([tripsObservable,tasksObservable]).subscribe (data =>{
      console.log("resultat get!", data)
      let tasks:any=data[0];
      for(let i =0;i<tasks.length;i++){
        if(tasks[i].completed==false && tasks[i].deadline != null){
          this.toDoTasks.push(tasks[i]);
        }
      }
      this.formatTasksDeadlinesToUtc();

      this.trips=data[1];
      this.formatTripsDatesToUtc();
      this.addToCalendar();

    });

  }

  // runs when the page has become inactive and clear variables
  ionViewDidLeave() {
    this.toDoTasks=[];
    this.eventSource = [];
  }

  getTodoTasks(){
    return this.tasksProvider.getAllRemoteTasks();
  }

  getTrips(){
    return this.tripProvider.getRemoteTrips();
  }

    // adds tasks and trip to calendar
    addToCalendar() {
      let events= this.eventSource; // all the previous events
      for(let i =0;i<this.toDoTasks.length;i++){
        events.push(this.toDoTasks[i]);
      }
      for(let i =0;i<this.trips.length;i++){
        events.push(this.trips[i]);
      }
      console.log("this.eventSource",this.eventSource)
      this.eventSource = [];
      setTimeout(() => {
        this.eventSource = events;
        //this.toDoTasks=[];
      });

    }

  formatTripsDatesToUtc(){
    for(let i =0;i<this.trips.length;i++){
      let tripData={   // data to be fed to the calendar
        allDay:false,
        startTime:new Date (this.trips[i].departure_date_time),
        endTime:  new Date (this.trips[i].arrival_date_time),
        title: "Trip: " + this.trips[i].departure_country + " to " + this.trips[i].arrival_country
      }
      this.trips[i]=tripData;
    }
    console.log("voyage formate",this.trips)
  }


// format the tasks'deadlines to be accepted by the calendar
formatTasksDeadlinesToUtc(){
  for(let i =0;i<this.toDoTasks.length;i++){
    let taskTime:string=this.toDoTasks[i].deadline.split("-");
    let taskData={                                        // data to be fed to the calendar
      allDay:true,                                      // tasks only last one day
      endTime:  new Date (+taskTime[0],+taskTime[1]-1,+taskTime[2]+1),
      startTime:new Date (+taskTime[0],+taskTime[1]-1,+taskTime[2]),
      title: this.toDoTasks[i].title
    }
    this.toDoTasks[i]=taskData;
  }
  console.log("tasks formate",this.toDoTasks)
}



//callback to get the month and year of the curent calendar page
onViewTitleChanged(title) {
  this.viewTitle = title;
}

//calback when an event is clicked, display brief informations about the clicked event
onEventSelected(event) {
  let start = moment(event.startTime).format('LLL');
  let end = moment(event.endTime).format('LLL');

  if (event.title.substring(0,4)=="Trip"){    // if this is a trip
    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle:"<br>" + "Departure:<br> " + start + "<br><br>Arrival:<br> "+ end ,
      buttons: ['OK']
    })
    alert.present();
  }
  else{                                       // if this is a task
    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle:"<br>Deadline:<br>" + start,
      buttons: ['OK']
    })
    alert.present();
  }


}

// callback to get the complete time of the selected day
onTimeSelected(ev) {
  this.selectedDay = ev.selectedTime;
}

}
