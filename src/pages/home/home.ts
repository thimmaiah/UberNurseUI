import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';
import { Login } from '../login/login';
import { ResponseUtility } from '../../providers/response-utility';
import { StaffingResponse } from '../staffing-response/staffing-response';
import { StaffingRequest } from '../staffing-request/staffing-request';
import { UserDetails } from '../users/user-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentUser: any;

  constructor(public navCtrl: NavController,
    public respUtility: ResponseUtility,
    private tokenService: Angular2TokenService) {

    this.tokenService.init({
      apiBase: "http://localhost:3000"
    });

    this.currentUser = this.tokenService.currentUserData;

  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter HomePage');
    this.currentUser = this.tokenService.currentUserData;
  }

  show_staffing_requests() {
    this.navCtrl.push(StaffingRequest);
  } 

  show_staffing_responses() {
    this.navCtrl.push(StaffingResponse);
  }

  show_profile() {
    this.navCtrl.push(UserDetails, this.currentUser);
  }

  login() {
    this.navCtrl.push(Login);
  }

  logout() {
    console.log("logout called")
    this.tokenService.signOut().subscribe(
      res => {
        this.currentUser = null;
        this.respUtility.showMsg("Logged out");
      },
      error => {
        console.log(error)
        this.respUtility.showWarning("Could not log user out at this time");
      } 
    );

  }

  register() {
    //this.navCtrl.push(Register);
  }

  contact() {

  }

}
