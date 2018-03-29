import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, ModalController } from 'ionic-angular';
import { TasksProvider } from '../../providers/tasks/tasks';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  toDoTasks:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public tasksProvider:TasksProvider,  public modalCtrl: ModalController,
   private alertCtrl: AlertController) {
    this.toDoTasks=[];

  }


  // runs when the page become active and get the updated todoTasks
  ionViewWillEnter (){
    this.getToDoTasks();

  }

  // runs when the page has become inactive and clear the todoTasks
  ionViewDidLeave() {
    this.toDoTasks=[];
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


  //Calendar callbacks


  addEvent(){
  }



  // adds tasks to calendar
  addTasksToCalendar() {
    this.formatTasksDeadlinesToUtc();
    let events= this.eventSource; // all the previous entered tasks
    for(let i =0;i<this.toDoTasks.length;i++){
      events.push(this.toDoTasks[i]);
    }
      console.log(events)
    this.eventSource = [];
    setTimeout(() => {
      this.eventSource = events;
    });


/*

    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
        if (data) {
          console.log("onDidDismiss   ", data);
          let eventData = data;

          eventData.startTime = new Date(data.startTime); // string to Date
          eventData.endTime = new Date(data.endTime);
          console.log("eventSource avant push  ", this.eventSource);
          let events= this.eventSource;
          events.push(eventData);
          //console.log("eventSource aprés push  ", this.eventSource);

          this.eventSource = [];
          setTimeout(() => {
            this.eventSource = events;
          });
        }
      });
*/
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
        //subTitle: 'From: ' + start + '<br>To: ' + end,
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
