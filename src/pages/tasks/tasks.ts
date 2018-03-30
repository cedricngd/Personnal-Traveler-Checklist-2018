import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, ModalController } from 'ionic-angular';
import { TasksProvider } from '../../providers/tasks/tasks';
import { TripsProvider } from '../../providers/trips/trips';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do';


//import { forkJoin } from "rxjs/observable/forkJoin";
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


Observable.forkJoin([tripsObservable,tasksObservable]).subscribe (data =>{
  console.log("resultat ge:!", data)
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


/*
  Observable.forkJoin(

        //  this.http.get('/app/books.json').map((res:Response) => res.json()),
        //this.http.get('/app/movies.json').map((res:Response) => res.json())
          this.getTodoTasks(),  // get the to-do tasks to be displayed
          this.getTrips(),      // get the trips
      ).subscribe(
        data => {
          let books = data[0]
          let movies = data[1]
        },
        err => console.error(err)
      );*/
/*
  Promise.all([
    this.getTodoTasks(),  // get the to-do tasks to be displayed
    this.getTrips(),      // get the trips
  ]).then(value => this.addToCalendar());
*/

  }

  // runs when the page has become inactive and clear variables
  ionViewDidLeave() {
    this.toDoTasks=[];
    this.eventSource = [];
  }

  getTodoTasks(){
    console.log("getTodoTasks");
    return this.tasksProvider.getAllRemoteTasks();
  }

  getTrips(){
    console.log("getTrips");

    return this.tripProvider.getRemoteTrips();
  }
  // get the tasks and trips
  /*
  getTodoTasks(){
    return this.tasksProvider.getAllRemoteTasks().subscribe(data=>{
          let tasks:any=data;
          for(let i =0;i<tasks.length;i++){
            if(tasks[i].completed==false ){
              this.toDoTasks.push(tasks[i]);
            }
          }
          this.formatTasksDeadlinesToUtc();
          console.log("on a les tasks !")
        });
  }
*/
/*
  getTrips(){
    return this.tripProvider.getRemoteTrips().subscribe(data=>{
            this.trips=data;
            this.formatTripsDatesToUtc();
            console.log("on a les trips !")
        });
  }
*/
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
        this.toDoTasks=[];
      });

    }

  formatTripsDatesToUtc(){
    for(let i =0;i<this.trips.length;i++){
/*
      let departure=this.trips[i].departure_date_time;
      let arrival=this.trips[i].arrival_date_time;

      let departureYear   = new Date(departure).getFullYear();
      let departureMonth  = new Date(departure).getMonth();
      let departureDay    = new Date(departure).getDate();
      let departureHours  = new Date(departure).getHours();
      let departureMinutes= new Date(departure).getMinutes();

      let arrivalYear   = new Date(arrival).getFullYear();
      let arrivalMonth  = new Date(arrival).getMonth();
      let arrivalDay    = new Date(arrival).getDate();
      let arrivalHours  = new Date(departure).getHours();
      let arrivalMinutes= new Date(departure).getMinutes();

      if(departureDay==arrivalDay   &&  departureMonth==arrivalMonth  &&
         departureYear==arrivalYear &&  departureHours==arrivalHours  &&
         departureMinutes==arrivalMinutes)  arrivalDay+=1;

      let tripData={   // data to be fed to the calendar
        allDay:false,
        startTime:new Date (Date.UTC( departureYear,departureMonth, departureDay, departureHours, departureMinutes)),
        endTime:  new Date (Date.UTC( arrivalYear, arrivalMonth,arrivalDay,arrivalHours,arrivalMinutes)),
        title: "Trip: " + this.trips[i].departure_country + " to " + this.trips[i].arrival_country
      }

      */


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
// see https://github.com/twinssbc/Ionic2-Calendar#eventsource
formatTasksDeadlinesToUtc(){

  for(let i =0;i<this.toDoTasks.length;i++){

    /*
    let year  = new Date(this.toDoTasks[i].deadline).getFullYear();
    let month = new Date(this.toDoTasks[i].deadline).getMonth();
    let day   = new Date(this.toDoTasks[i].deadline).getDate();
    */
    let taskTime:string=this.toDoTasks[i].deadline.split("-");

    let taskData={                                        // data to be fed to the calendar
      allDay:true,                                      // tasks only last one day
      //endTime:  new Date (Date.UTC( year, month,day+1)),
      //startTime:new Date (Date.UTC( year,month, day)),
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

    onEventSelected(event) {

      let start = moment(event.startTime).format('LLL');
      let end = moment(event.endTime).format('LLL');

      if (event.title.substring(0,4)=="Trip"){
        let alert = this.alertCtrl.create({
          title: '' + event.title,
          subTitle:"<br>" + "Departure:<br> " + start + "<br><br>Arrival:<br> "+ end ,
          buttons: ['OK']
        })
        alert.present();
      }
      else{
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
