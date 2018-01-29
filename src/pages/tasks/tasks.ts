import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TasksProvider } from '../../providers/tasks/tasks';

@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {

  toDoTasks:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public tasksProvider:TasksProvider) {
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
        });

  }


}
