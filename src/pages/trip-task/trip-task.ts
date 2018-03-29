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


  public toDoTasksHealth:any[];     // contains the remaining health related tasks
  public tasksDoneHealth:any[];     // contains the already health related executed tasks

  public toDoTasksPaperwork:any[];     // contains the remaining paperwork related tasks
  public tasksDonePaperwork:any[];     // contains the already paperwork related executed tasks

  public toDoTasksMisc:any[];     // contains the remaining miscellanous tasks
  public tasksDoneMisc:any[];     // contains the already miscellanous executed tasks

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
      this.tasksSelection="todo";             // by default, display tasks to be done
      let trip = this.navParams.get('trip');  // get the trip informations from trip.ts
      this.departure = trip.departure_country;
      this.arrival = trip.arrival_country;
      this.id=trip.id;
    }

    // refresh the displayed tasks
    updateTasks(id){
      this.toDoTasksHealth=[];
      this.tasksDoneHealth=[];

      this.toDoTasksPaperwork=[];
      this.tasksDonePaperwork=[];

      this.toDoTasksMisc=[];
      this.tasksDoneMisc=[];

      this.tasksProvider.getRemoteTasksById(id).subscribe((allTasks:any[])=>{
        this.sortTask(allTasks);
      });
      console.log("tasksDone",this.toDoTasksHealth)
      console.log("toDoTasks: ",this.tasksDoneHealth)

    }

    // sort tasks in 3 categories: Health related and Paperwork related and other kinds
    sortTask(allTasks:any[]){
      for(let i =0;i<allTasks.length;i++){
        if(allTasks[i].category=="Health" && allTasks[i].completed==true ){
          // add this task to the checked health related tasks
          this.tasksDoneHealth.push(allTasks[i]);
        }
        else if (allTasks[i].category=="Health" && allTasks[i].completed==false){
          // add this task to the health related tasks to be done
          this.toDoTasksHealth.push(allTasks[i]);
        }
        else if (allTasks[i].category=="Paperwork" && allTasks[i].completed==true){
          this.tasksDonePaperwork.push(allTasks[i]);
        }
        else if (allTasks[i].category=="Paperwork" && allTasks[i].completed==false){
          this.toDoTasksPaperwork.push(allTasks[i]);
        }
        else if (allTasks[i].category=="Others" && allTasks[i].completed==true){
          this.tasksDoneMisc.push(allTasks[i]);
        }
        else if (allTasks[i].category=="Others" && allTasks[i].completed==false){
          this.toDoTasksMisc.push(allTasks[i]);
        }
        else{
          console.error("error in trip-task.ts l65");
        }
      }
    }

    taskDone(task:any ){
      this.changeTask(task,true);
    }

    taskToDo(task:any){
      this.changeTask(task,false);
    }


    // change either the completed field of the given task
    changeTask(task:any,completed:boolean){
      this.tasksProvider.updateTask(task.url,completed).subscribe(data=>{
          this.updateTasks(task.trip);
        });
    }


    showTaskInfo(task:any){
      if(task.comments != "" && task.comments != null){
          this.tasksProvider.getTaskInfo(task).present();
      }
    }

    //add a new task for this trip
    addTask(){
      let modal= this.addCustomTaskModal.create('AddCustomTaskPage',{id:this.id});
      modal.onDidDismiss(() => {
        this.updateTasks(this.id);
      });
      modal.present();
    }

  }
