import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController} from 'ionic-angular';
import { AuthentificationProvider } from '../../providers/authentification/authentification';


@Injectable()
export class TasksProvider {
  private baseUrl = 'http://127.0.0.1:8000/trips/';

  constructor(public http:HttpClient,  public authProvider: AuthentificationProvider,
              public alertCtrl: AlertController) {
  }

  // not used
  public generateRemoteTasks(id){
    return this.http.get(this.baseUrl+id+'/generate_tasks/',{headers:this.authProvider.createHeader()});
  }

  // get tasks from a specific trip
  public getRemoteTasksById(id){
    return this.http.get(this.baseUrl+id+'/tasks/',{headers:this.authProvider.createHeader()});
  }

  // get all the tasks
  public getAllRemoteTasks(){
    return this.http.get('http://127.0.0.1:8000/tasks/',{headers:this.authProvider.createHeader()});
  }

  //change a field in the Task JSON
  public updateTask(taskUrl:any,completed:boolean,isVisible:boolean){
    if(isVisible==null){// set a task to "completed" (task.completed =true) or "not completed yet" (task.completed =false)
    return this.http.patch(taskUrl,{completed:completed},{headers:this.authProvider.createHeader()});
    }
    else if (completed == null){ // set if the task is displaying or not
      return this.http.patch(taskUrl,{isVisible:isVisible},{headers:this.authProvider.createHeader()});
    }
    else{
      console.error("Error in tasks.updateTask()");
    }
  }

  public addTasks(task:any){
    return this.http.post('http://127.0.0.1:8000/tasks/',task,{headers:this.authProvider.createHeader()});
  }

  // get info about a specific task 
  getTaskInfo(task:any){
    let alert = this.alertCtrl.create({
     title: task.title,
     subTitle: task.comments,
     buttons: ['OK']
    });
    return alert;
  }

}
