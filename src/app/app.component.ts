import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Users } from '../pages/users/users';
import { UserPic } from '../pages/user-pic/user-pic';
import { Hospitals } from '../pages/hospitals/hospitals';
import { Login } from '../pages/login/login';
import { StaffingRequest } from '../pages/staffing-request/staffing-request';
import { StaffingResponse } from '../pages/staffing-response/staffing-response';
import { Payment } from '../pages/payment/payment'

import { Config } from '../providers/config';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public config:Config) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [

      { title: 'Care Homes', component: Hospitals },
      { title: 'StaffingRequest', component: StaffingRequest },
      { title: 'StaffingResponse', component: StaffingResponse },
      { title: 'UserPic', component: UserPic },
      { title: 'Users', component: Users },
      { title: 'Payments', component: Payment }
    ];

  }

  initializeApp() {

    console.log(this.config.props["API_URL"]);

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}
