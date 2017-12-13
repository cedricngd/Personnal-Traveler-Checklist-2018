import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';


import { TasksPage } from '../pages/tasks/tasks';
import { ProfilePage } from '../pages/profile/profile';
import { TripsPage } from '../pages/trips/trips';
import { TabsPage } from '../pages/tabs/tabs';

import { TripTaskPage } from '../pages/trip-task/trip-task';




import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TripsProvider } from '../providers/trips/trips';
import { TasksProvider } from '../providers/tasks/tasks';

@NgModule({
  declarations: [
    MyApp,
    TasksPage,
    ProfilePage,
    TripsPage,
    TabsPage,
    TripTaskPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TasksPage,
    ProfilePage,
    TripsPage,
    TabsPage,
    TripTaskPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TripsProvider,
    TasksProvider
  ]
})
export class AppModule {}
