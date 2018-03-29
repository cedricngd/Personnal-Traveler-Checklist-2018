import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, ModalController } from 'ionic-angular';
import { TasksProvider } from '../../providers/tasks/tasks';
import { TripsProvider } from '../../providers/trips/trips';
import * as moment from 'moment';

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
    //this.trips=[];

  }


  // runs when the page become active and get the updated todoTasks
  ionViewWillEnter (){
    this.getToDoTasks();
    this.getTrips();

  }

  // runs when the page has become inactive and clear variables
  ionViewDidLeave() {
    this.toDoTasks=[];
    this.eventSource = [];
  }


  // only get the tasks that have not been checked yet
  getToDoTasks(){
    this.tasksProvider.getAllRemoteTasks().subscribe(data=>{
          let tasks:any=data;
          for(let i =0;i<tasks.length;i++){
            if(tasks[i].completed==false ){
              this.toDoTasks.push(tasks[i]);
            }
          }
          this.addTasksToCalendar();

        });
  }

  getTrips(){
    this.tripProvider.getRemoteTrips().subscribe(data=>{
            this.trips=data;
            this.addTripsToCalendar();
        });
  }


  //Calendar callbacks

  addTripsToCalendar(){
    this.formatTripsDatesToUtc();
    let events= this.eventSource; // all the previous entered tasks
    for(let i =0;i<this.trips.length;i++){
      events.push(this.trips[i]);
    }
    console.log("event",this.eventSource)
    this.eventSource = [];
    setTimeout(() => {
      this.eventSource = events;
    });

  }

  formatTripsDatesToUtc(){
    for(let i =0;i<this.trips.length;i++){

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

      if(departureDay==arrivalDay && departureMonth==arrivalMonth && departureYear==arrivalYear){
        arrivalDay+=1;
      }

      let tripData={   // data to be fed to the calendar
        allDay:false,
        startTime:new Date (Date.UTC( departureYear,departureMonth, departureDay, departureHours, departureMinutes)),
        endTime:  new Date (Date.UTC( arrivalYear, arrivalMonth,arrivalDay,arrivalHours,arrivalMinutes)),
        title: "Trip: " + this.trips[i].departure_country + " to " + this.trips[i].arrival_country
      }
      this.trips[i]=tripData;
    }
    console.log("voyage formate",this.trips)

  }

  // adds tasks to calendar
  addTasksToCalendar() {
    this.formatTasksDeadlinesToUtc();
    let events= this.eventSource; // all the previous entered tasks
    for(let i =0;i<this.toDoTasks.length;i++){
      events.push(this.toDoTasks[i]);
    }
    this.eventSource = [];
    setTimeout(() => {
      this.eventSource = events;
      this.toDoTasks=[];
    });

  }

// format the tasks'deadlines to be accepted by the calendar
// see https://github.com/twinssbc/Ionic2-Calendar#eventsource
formatTasksDeadlinesToUtc(){

  for(let i =0;i<this.toDoTasks.length;i++){
    let year  = new Date(this.toDoTasks[i].deadline).getFullYear();
    let month = new Date(this.toDoTasks[i].deadline).getMonth();
    let day   = new Date(this.toDoTasks[i].deadline).getDate();

    let taskData={                                        // data to be fed to the calendar
      allDay:true,                                      // tasks only last one day
      endTime:  new Date (Date.UTC( year, month,day+1)),
      startTime:new Date (Date.UTC( year,month, day)),
      title: this.toDoTasks[i].title
    }
    this.toDoTasks[i]=taskData;
  }

}



//callback to get the month and year of the curent calendar page
    onViewTitleChanged(title) {
      this.viewTitle = title;
    }

    onEventSelected(event) {

      let start = moment(event.startTime).format('LL');

      let alert = this.alertCtrl.create({
        title: '' + event.title,
        subTitle:"Deadline:<br>" + start,
        buttons: ['OK']
      })
      alert.present();

    }

    // callback to get the complete time of the selected day
    onTimeSelected(ev) {
      this.selectedDay = ev.selectedTime;
    }

}
