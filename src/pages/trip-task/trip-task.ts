import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { TasksProvider } from '../../providers/tasks/tasks';

@IonicPage()
@Component({
  selector: 'page-trip-task',
  templateUrl: 'trip-task.html',
})
export class TripTaskPage {
  public trip:any;       // json of the selected trip
  public id:any;         // id of the selected trip
  public departure:any;
  public arrival:any;


  public toDoTasks:any[];     // contains the remaining tasks
  public tasksDone:any[];     // contains the already executed tasks
  public deletedTasks:any[];  // contains the unwanted tasks
  public tasksSelection:any;  // to choose between displaying executed tasks and the tasks to be done


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public tasksProvider:TasksProvider,public alertCtrl: AlertController) {

      this.tasksSelection="todo"; // by default, display tasks to be done
      this.trip = navParams.get('trip'); // get the trip informations from trip.ts
      console.log("trip",this.trip);
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
      this.deletedTasks=[];
      this.tasksProvider.getRemoteTasksById(id).subscribe((allTasks:any[])=>{
        for(let i =0;i<allTasks.length;i++){
          if(allTasks[i].completed==true && allTasks[i].isVisible==true){
            // add this task to the checked tasks
            this.tasksDone.push(allTasks[i]);
          }
          else if (allTasks[i].completed==false && allTasks[i].isVisible==true){
            // add this task to the tasks to be done
            this.toDoTasks.push(allTasks[i]);
          }
          else{
            // add this task to the deleted tasks
            this.deletedTasks.push(allTasks[i]);
          }
        }
      });
    }

    updateTask(task:any,completed:boolean,isVisible:boolean){
      this.tasksProvider.updateTask(task.url,completed,isVisible).subscribe(data=>{
          this.sortTasks(task.trip);
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

    deleteTask(task:any){
      this.updateTask(task,null,false);
    }

    restoreTask(task:any){
      this.updateTask(task,null,true);
    }

    taskDone(task:any ){
      this.updateTask(task,true,null);
    }

    taskToDo(task:any){
      this.updateTask(task,false,null);
    }

    //add a new task for this trip
    public addTask(){

      let task={
        "trip": "http://127.0.0.1:8000/trips/"+this.id+"/",
        "title":	"Test",
        "deadline":	null,
        "completed":	true,
        "comments": "ceci est un test",
        "auto":	true,
        "isVisible":	true,
      }

      this.tasksProvider.addTasks(task).subscribe(data=>{
          console.log("add new task", data);
        });

    }

  }
