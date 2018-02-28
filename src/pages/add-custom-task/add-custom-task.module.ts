import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCustomTaskPage } from './add-custom-task';

@NgModule({
  declarations: [
    AddCustomTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCustomTaskPage),
  ],
})
export class AddCustomTaskPageModule {}
