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

  //change a field in the JSON Task
  public updateTask(taskUrl:any,completed:boolean){
    return this.http.patch(taskUrl,{completed:completed},{headers:this.authProvider.createHeader()});

  }

  public addTasks(title:any,comments:any,tripId:any){
    return this.http.post('http://127.0.0.1:8000/tasks/',this.jsonFormat(title,comments,tripId),{headers:this.authProvider.createHeader()});
  }

  // format JSON to create a new task
  public jsonFormat(title:any,comments:any,tripId:any){
    let task={
      "trip": tripId,
      "title":	title,
      "deadline":	null,
      "completed":	false,
      "comments": comments,
      "auto":	false,
      "isVisible":	true,
    }
    return task;
  }
/*
  // get info about a specific task
  getTaskInfo(task:any){
    let alert = this.alertCtrl.create({
     title: task.title,
     subTitle: task.comments,
     buttons: ['OK']
    });
    return alert;
  }*/

}
