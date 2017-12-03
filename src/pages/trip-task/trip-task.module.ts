import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripTaskPage } from './trip-task';

@NgModule({
  declarations: [
    TripTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(TripTaskPage),
  ],
})
export class TripTaskPageModule {}
