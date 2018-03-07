import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ToastController,
ModalController} from 'ionic-angular';
import { TasksProvider } from '../../providers/tasks/tasks';
//import { AddCustomTaskPage } from '../add-custom-task/add-custom-task';


@IonicPage()
@Component({
  selector: 'page-trip-task',
  templateUrl: 'trip-task.html',
})
export class TripTaskPage {
  public id:any;              // id of the selected trip
  public departure:any;       // departure country of the selected trip
  public arrival:any;         // arrival country of the selected trip


  public toDoTasks:any[];     // contains the remaining tasks
  public tasksDone:any[];     // contains the already executed tasks
  public deletedTasks:any[];  // contains the unwanted tasks
  public tasksSelection:any;  // to select which kind of task will be showed
                              // when the page first appear


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public tasksProvider:TasksProvider,public toastCtrl: ToastController,
  public addCustomTaskModal: ModalController) {
      this.init();
      this.updateTasks(this.id);
    }

    // set initial variables
    init(){
      this.tasksSelection="todo"; // by default, display tasks to be done
      let trip = this.navParams.get('trip'); // get the trip informations from trip.ts
      this.departure = trip.departure_country;
      this.arrival = trip.arrival_country;
      this.id=trip.id;
    }

    // refresh the displayed tasks
    updateTasks(id){
      this.tasksDone=[];
      this.toDoTasks=[];
      this.deletedTasks=[];
      this.tasksProvider.getRemoteTasksById(id).subscribe((allTasks:any[])=>{
        this.sortTask(allTasks);
      });
    }

    // sort tasks in 3 categories: tasks to do, checked tasks  and unwanted tasks
    sortTask(allTasks:any[]){
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
    }

    // change either the completed field or the isVisible field of the given task
    changeTask(task:any,completed:boolean,isVisible:boolean){
      this.tasksProvider.updateTask(task.url,completed,isVisible).subscribe(data=>{
          this.updateTasks(task.trip);
        });
    }


    showTaskInfo(task:any){
      if(task.comments != "" && task.comments != null){
          this.tasksProvider.getTaskInfo(task).present();
      }
    }

    deleteTask(task:any){
      this.changeTask(task,null,false);
    }

    restoreTask(task:any){
      this.changeTask(task,null,true);
    }

    taskDone(task:any ){
      this.changeTask(task,true,null);
    }

    taskToDo(task:any){
      this.changeTask(task,false,null);
    }

    //add a new task for this trip
    public addTask(){

      let modal= this.addCustomTaskModal.create('AddCustomTaskPage',{id:this.id}); //TODO faire en lazy loading
      modal.onDidDismiss(() => {
        this.updateTasks(this.id);
      });
      modal.present();
    }

  }
