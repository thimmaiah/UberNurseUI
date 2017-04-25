import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';
import { Login } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentUser: any;

  constructor(public navCtrl: NavController, private tokenService: Angular2TokenService) {
    
    this.tokenService.init({
      apiBase: "http://localhost:3000"
    });

    this.currentUser = this.tokenService.currentUserData;
    
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter HomePage');
    this.currentUser = this.tokenService.currentUserData;
  }

  login() {
    this.navCtrl.push(Login);
  }

  register() {

  }

  contact() {

  }

}
