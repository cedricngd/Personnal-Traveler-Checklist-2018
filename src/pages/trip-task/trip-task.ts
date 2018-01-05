import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { TasksProvider } from '../../providers/tasks/tasks';

@IonicPage()
@Component({
  selector: 'page-trip-task',
  templateUrl: 'trip-task.html',
})
export class TripTaskPage {
  trip:any;       // json of the selected trip
  id:any;         // id of the selected trip
  departure:any;
  arrival:any;


  toDoTasks:any[];  // contains the remaining tasks
  tasksDone:any[];  // contains the already executed tasks
  tasksSelection:any; // to choose between displaying executed tasks and the tasks to be done


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public tasksProvider:TasksProvider,public alertCtrl: AlertController) {
      console.log("constructor trip task");
      this.tasksSelection="todo"; // by default, display tasks to be done
      this.tasksDone=[];
      this.toDoTasks=[];
      this.trip = navParams.get('trip'); // get the trip informations from trip.ts
      this.departure = this.trip.departure_country;
      this.arrival = this.trip.arrival_country;
      this.id=this.trip.id;

      this.sortTasks(this.id);


    }

    ionViewDidLoad() {
    }

    sortTasks(id){
      this.tasksDone=[];
      this.toDoTasks=[];
      this.tasksProvider.getRemoteTasks(id).subscribe((allTasks:any[])=>{
            for(let i =0;i<allTasks.length;i++){
              if(allTasks[i].completed==true){
                // add this task to tasksDone
                this.tasksDone.push(allTasks[i]);
              }

              else{
                this.toDoTasks.push(allTasks[i]);
                //this.tasksDone.splice(this.tasksDone.indexOf(allTasks[i]),1);
              }

            }
          });


    }

    updateTask(task:any,bool:boolean){
        let ret=this.tasksProvider.updateTask(task.url,bool).subscribe(data=>{
          this.sortTasks(task.trip);
        });
    }

  /*
    //regenerate automatic tasks if they have been deleted by the user but he wants them back
    generateTasks(id){
      this.tasksProvider.generateRemoteTasks(id).subscribe( data=>{
        console.log(data);
      });
    }
  */

    showTaskInfo(task:any){
      let alert = this.alertCtrl.create({
       title: task.title,
       subTitle: task.comments,
       buttons: ['OK']
      });
      alert.present();
    }

   deleteTask(task:any){ //TODO


    }

    taskDone(task:any ){
      this.updateTask(task,true);
    }

    taskToDo(task:any){
      this.updateTask(task,false);
    }

  }
