import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';
import { Login } from '../login/login';
import { ResponseUtility } from '../../providers/response-utility';
import { RegisterPage } from '../users/register';
import { Payment } from '../payment/payment';
import { Config } from '../../providers/config';
import { LoginProvider } from '../../providers/login-provider';
import { Events } from 'ionic-angular';
import { ContactPage } from '../static/contact';
import {HomeEvents} from './home-events';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends HomeEvents {

  currentUser: any;
  registerCareHome = false;

  constructor(public navCtrl: NavController,
    public respUtility: ResponseUtility,
    public tokenService: Angular2TokenService,
    public config: Config,
    public events: Events,
    private loginProvider: LoginProvider) {

    super(navCtrl, respUtility, tokenService, config, events);

  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter HomePage ');
    this.currentUser = this.tokenService.currentUserData;
  }

  show_payments() {
    this.navCtrl.push(Payment);
  }

  login() {
    this.navCtrl.push(Login);
  }


  logout() {
    this.loginProvider.logout();
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  contact() {
    this.navCtrl.push(ContactPage);
  }

}
