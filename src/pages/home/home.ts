import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';
import { Login } from '../login/login';
import { ResponseUtility } from '../../providers/response-utility';
import { Shift } from '../shift/shift';
import { StaffingRequest } from '../staffing-request/staffing-request';
import { UserDetails } from '../users/user-details';
import { UserForm } from '../users/user-form';
import { CareHomeSearch } from '../care-homes/care-home-search';
import { Payment } from '../payment/payment';
import { Config } from '../../providers/config';
import { LoginProvider } from '../../providers/login-provider';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentUser: any;
  registerCareHome = false;

  constructor(public navCtrl: NavController,
    public respUtility: ResponseUtility,
    private tokenService: Angular2TokenService,
    private config: Config,
    public events: Events,
    private loginProvider: LoginProvider) {

    // When the user login succeeds
    events.subscribe('user:login:success', () => {
      console.log("HomePage: user:login:success");
      this.currentUser = this.tokenService.currentUserData;
      this.displayMsgs();
    });

    // When the care home registration succeeds
    events.subscribe('care_home:registration:success', (care_home) => {
      console.log("HomePage: care_home:registration:success");
      this.tokenService.currentUserData["care_home_id"] = care_home.id;
      this.tokenService.currentUserData["care_home"] = care_home;      
      this.currentUser = this.tokenService.currentUserData;
      this.displayMsgs();
    });

    // When the user logout succeeds
    events.subscribe('user:logout:success', () => {
      console.log("HomePage: user:logout:success");
      this.currentUser = null;
    });

  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter HomePage ');
    this.currentUser = this.tokenService.currentUserData;
    this.displayMsgs();
  }

  displayMsgs() {

    console.log(this.currentUser);

    if (this.currentUser && this.currentUser.role == "Admin") {

      if (this.currentUser.care_home_id == null) {
        this.registerCareHome = true;
        this.respUtility.showWarning("Please register your care home and get it verified at the earliest.");
      }
      if (this.currentUser.care_home && !this.currentUser.care_home.verified) {
        this.registerCareHome = false;
        this.respUtility.showWarning("Please Call us to get your care home verified at the earliest.");
      }

    }
    else if (this.currentUser && (this.currentUser.role == "Care Giver" || this.currentUser.role == "Nurse") && this.currentUser.verified !== true) {
      this.respUtility.showWarning("Please upload your documents for verification");
    }
  }

  register_care_home() {
    this.navCtrl.push(CareHomeSearch);
  }

  show_payments() {
    this.navCtrl.push(Payment);
  }

  show_staffing_requests() {
    this.navCtrl.push(StaffingRequest);
  }

  show_shifts(response_status) {
    this.navCtrl.push(Shift, {response_status: response_status});
  }

  show_profile() {
    this.navCtrl.push(UserDetails, this.currentUser);
  }

  login() {
    this.navCtrl.push(Login);
  }


  logout() {
    this.loginProvider.logout();
  }

  register() {
    // let user = {"first_name": "Mohith", "last_name":"Thimmaiah", "email":"thimm@gmail.com",
    // "phone":"9449025878", "role":"Care Giver", "sex":"Male", "address":"123 Bakers Street", 
    // "languages":"English,French", "occupation":"Nurse", "speciality":"Geriatrics", "experience":10, 
    // "pref_commute_distance":10};
    this.navCtrl.push(UserForm);
  }

  contact() {
    //this.navCtrl.push(Contact);
  }

}
