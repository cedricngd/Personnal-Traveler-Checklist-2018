import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';


import { TasksPage } from '../pages/tasks/tasks';
import { ProfilePage } from '../pages/profile/profile';
import { TripsPage } from '../pages/trips/trips';
import { TabsPage } from '../pages/tabs/tabs';
import { TripTaskPage } from '../pages/trip-task/trip-task';
import { LoginPage } from '../pages/login/login';

//import { AddCustomTaskPage } from '../pages/add-custom-task/add-custom-task';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TripsProvider } from '../providers/trips/trips';
import { TasksProvider } from '../providers/tasks/tasks';
import { AuthentificationProvider } from '../providers/authentification/authentification';
import { ProfileProvider } from '../providers/profile/profile';

@NgModule({
  declarations: [
    MyApp,
    TasksPage,
    ProfilePage,
    TripsPage,
    TabsPage,
    TripTaskPage,
    LoginPage,
  //  AddCustomTaskPage,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TasksPage,
    ProfilePage,
    TripsPage,
    TabsPage,
    TripTaskPage,
    LoginPage,
  //  AddCustomTaskPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TasksProvider,
    AuthentificationProvider,
    TripsProvider,
    ProfileProvider,
  ]
})
export class AppModule {}
