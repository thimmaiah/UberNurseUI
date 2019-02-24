import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularTokenService } from 'angular-token';
import { Login } from '../login/login';
import { ResponseUtility } from '../../providers/response-utility';
import { RegisterPage } from '../users/register';
import { Payment } from '../payment/payment';
import { Config } from '../../providers/config';
import { LoginProvider } from '../../providers/login-provider';
import { Events } from 'ionic-angular';
import { ContactPage } from '../static/contact';
import { Menu } from './menus';
import { HomeEvents } from '../../providers/home-events';
import { UserApi } from '../../providers/user-api';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements Menu {

  currentUser: any;
  registerCareHome = false;
  initData: any;
  
  constructor(public navCtrl: NavController,
    public respUtility: ResponseUtility,
    public tokenService: AngularTokenService,
    public config: Config,
    public events: Events,
    public userApi: UserApi,
    public homeEvents: HomeEvents,
    private loginProvider: LoginProvider) {

    this.homeEvents.registerMenu(this);
    
  }

  displayMsgs() {

  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter HomePage ');
    this.currentUser = this.tokenService.currentUserData;
    this.getInitialData();
  }

  show_payments() {
    this.navCtrl.push(Payment);
  }

  login() {
    this.navCtrl.push(Login);
  }


  logout() {
    this.respUtility.trackEvent("User", "Logout", "click");
    this.loginProvider.logout();
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  contact() {
    this.navCtrl.push(ContactPage);
  }


  getInitialData() {
    this.userApi.getInitialData().subscribe(
        response => {
            console.log("Loaded initData: ");
            this.initData = response;
            console.log(this.initData);
        },
        error => {
            this.respUtility.showFailure(error);
        }
    );
}


}
