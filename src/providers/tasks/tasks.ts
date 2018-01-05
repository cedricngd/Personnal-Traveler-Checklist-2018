import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthentificationProvider } from '../../providers/authentification/authentification';


@Injectable()
export class TasksProvider {
  private baseUrl = 'http://127.0.0.1:8000/trips/';

  constructor(public http:HttpClient,  public authProvider: AuthentificationProvider) {
  }

  public generateRemoteTasks(id){
    return this.http.get(this.baseUrl+id+'/generate_tasks/',{headers:this.authProvider.createHeader()});


  }


  public getRemoteTasks(id){
    return this.http.get(this.baseUrl+id+'/tasks/',{headers:this.authProvider.createHeader()});
  }

  // set a task to "completed" (task.completed =true) or "not completed yet" (task.completed =false)
  public updateTask(taskUrl:any,bool:boolean){
    return this.http.patch(taskUrl,{completed:bool},{headers:this.authProvider.createHeader()});
  }
}
