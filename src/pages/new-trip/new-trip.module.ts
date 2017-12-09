import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewTripPage } from './new-trip';

@NgModule({
  declarations: [
    NewTripPage,
  ],
  imports: [
    IonicPageModule.forChild(NewTripPage),
  ],
})
export class NewTripPageModule {}
