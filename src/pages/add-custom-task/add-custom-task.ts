import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams,ViewController, } from 'ionic-angular';
import { TasksProvider } from '../../providers/tasks/tasks';


@IonicPage()
@Component({
  selector: 'page-add-custom-task',
  templateUrl: 'add-custom-task.html',
})
export class AddCustomTaskPage {


  public title:any;
  public comments:any;
  public tripId:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private view:ViewController, public tasksProvider:TasksProvider) {

  }
  //get the id of the corresponding trip
  ionViewWillLoad(){
    this.tripId= this.navParams.get('id');

  }


  createTask(){
    //console.log(this.title);

    this.tasksProvider.addTasks(this.title, this.comments, this.tripId).subscribe(data=>{
        this.close();
      });
  }

  close(){
    this.view.dismiss();

  }

}
