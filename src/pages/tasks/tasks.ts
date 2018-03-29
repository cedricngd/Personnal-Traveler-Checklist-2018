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
            if(tasks[i].completed==false && tasks[i].isVisible==true){
              this.toDoTasks.push(tasks[i]);
            }

          }
          console.log("on recoit ces taches: ",this.toDoTasks)

        });

  }

  showTaskInfo(task:any){
    if(task.comments != "" && task.comments != null){
        this.tasksProvider.getTaskInfo(task).present();
    }
  }



  //Calendar callbacks

  // callback when add button is pressed: add an event
  addEvent() {


    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
        if (data) {
          console.log("onDidDismiss   ", data);
          let eventData = data;

          eventData.startTime = new Date(data.startTime);
          eventData.endTime = new Date(data.endTime);

          let events = this.eventSource;
          events.push(eventData);
          this.eventSource = [];
          setTimeout(() => {
            this.eventSource = events;
          });
        }
      });

    }

//callback to get the month and year of the curent calendar page
    onViewTitleChanged(title) {
      this.viewTitle = title;
    }

    onEventSelected(event) {
      console.log("onEventSelected",  this.selectedDay );
      console.log("event.startTime",  event.startTime);
      console.log("moment(event.startTime)",  moment(event.startTime));
      console.log("moment(event.startTime).format('LLLL')",  moment(event.startTime).format('LLLL'));


      let start = moment(event.startTime).format('LLLL'); // e.g. Thursday, March 22, 2018 12:00 PM
      let end = moment(event.endTime).format('LLLL');

      let alert = this.alertCtrl.create({
        title: '' + event.title,
        subTitle: 'From: ' + start + '<br>To: ' + end,
        buttons: ['OK']
      })
      alert.present();

    }

    // callback to get the complete time of the selected day
    onTimeSelected(ev) {
      this.selectedDay = ev.selectedTime;
    }








}
