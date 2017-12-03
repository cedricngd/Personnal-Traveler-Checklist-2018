import { Component } from '@angular/core';

import { TasksPage } from '../tasks/tasks';
import { ProfilePage } from '../profile/profile';
import { TripsPage } from '../trips/trips';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TripsPage;
  tab2Root = TasksPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
