import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, AlertController} from 'ionic-angular';
import { TasksProvider } from '../../providers/tasks/tasks';

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
    public tasksProvider:TasksProvider,public alertCtrl: AlertController) {

      this.trip = navParams.get('trip'); // get the trip name from trip.ts
      this.departure = this.trip.departure_country;
      this.arrival = this.trip.arrival_country;

      this.updateTasks(this.trip.id);

  }

  ionViewDidLoad() {
  }

  updateTasks(id){
  this.tasksProvider.getRemoteTasks(id).subscribe(data=>{
          this.tasks=data;
          console.log("tasks generated:", data);
        });
  }

  //regenerate automatic tasks if they have been deleted by the user but he wants them back
  generateTasks(id){
    this.tasksProvider.generateRemoteTasks(id).subscribe( data=>{
      console.log(data);
    });
  }


  showTaskInfo(task:any){
    let alert = this.alertCtrl.create({
     title: task.title,
     subTitle: task.comments,
     buttons: ['OK']
    });
    alert.present();
 }
 deleteTask(){ //TODO
   console.log("not implemented yet")
 }



  }
