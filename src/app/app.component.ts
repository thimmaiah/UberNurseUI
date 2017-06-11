import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Users } from '../pages/users/users';
import { UserPic } from '../pages/user-pic/user-pic';
import { CareHomes } from '../pages/care-homes/care-homes';
import { Payment } from '../pages/payment/payment'
import { Rating } from '../pages/rating/rating'
import { Angular2TokenService } from 'angular2-token';
import { Config } from '../providers/config';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { LoginProvider } from '../providers/login-provider';
import { Events } from 'ionic-angular';

import { ResponseUtility } from '../../providers/response-utility';
import { UserDetails } from '../pages/users/user-details';
import { UserForm } from '../pages/users/user-form';
import { CareHomeSearch } from '../pages/care-homes/care-home-search';
import { Login } from '../pages/login/login';
import { StaffingRequest } from '../pages/staffing-request/staffing-request';
import { Shift } from '../pages/shift/shift';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  currentUser: any;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public push: Push,
    private tokenService: Angular2TokenService,
    private config: Config,
    public events: Events,
    private loginProvider: LoginProvider,
    public alertCtrl: AlertController) {


    this.initializeApp();


  }

  initPushNotification() {
    console.log("initPushNotification");
    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }

    // to check if we have permission
    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });

    const options: PushOptions = {
      android: {
        senderID: '600472014859'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log("registrationId ->", data.registrationId);
      // Lets store this in the push_token. This is because at this point the user may not be logged in
      // When he logs in we will save it
      this.config.props["push_token"] = data.registrationId;
      console.log("this.config.props[push_token] = ", this.config.props["push_token"]);
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message', data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
              //this.nav.push(DetailsPage, { message: data.message });
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        //this.nav.push(DetailsPage, { message: data.message });
        console.log("Push notification clicked");
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  initializeApp() {

    console.log(this.config.props["API_URL"]);

    this.platform.ready().then(
      () => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.initPushNotification();



        this.tokenService.init({
          apiBase: this.config.props["API_URL"],
          updatePasswordPath: "/auth/password"
        });

        this.currentUser = this.tokenService.currentUserData;

        this.events.subscribe('user:login:success', () => {
          console.log("HomePage: user:login:success");
          this.currentUser = this.tokenService.currentUserData;

          if (this.currentUser.role == "Admin") {
            this.pages = [
              { title: 'Staffing Requests', component: StaffingRequest },
              { title: 'Shifts', component: Shift },
              { title: 'Payments', component: Payment },
              { title: 'Ratings', component: Rating }

            ];
            
            //this.nav.push(StaffingRequest);

          } else {
            this.pages = [
              { title: 'Shift', component: Shift },
              { title: 'Payments', component: Payment },
              { title: 'Ratings', component: Rating }
            ];
            
            //this.nav.push(Shift);
          }
        });

        this.events.subscribe('user:logout:success', () => {
          console.log("HomePage: user:logout:success");
          this.currentUser = null;

          this.pages = [
            { title: 'Login', component: Login },
            { title: 'Register', component: UserDetails },
          ];

        });

        if (this.currentUser == null) {
          this.loginProvider.auto_login(null);
        }

      }
      , (error) => {
        console.log(error);
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }


  show_profile() {
    this.nav.push(UserDetails, this.currentUser);
  }

  login() {
    this.nav.push(Login);
  }


  logout() {
    this.loginProvider.logout();
  }
}

