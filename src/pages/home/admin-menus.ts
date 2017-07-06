import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';
import { Login } from '../login/login';
import { ResponseUtility } from '../../providers/response-utility';
import { Shift } from '../shift/shift';
import { StaffingRequest } from '../staffing-request/staffing-request';
import { StaffingRequestForm } from '../staffing-request/staffing-request-form';
import { UserDetails } from '../users/user-details';
import { UserForm } from '../users/user-form';
import { RegisterPage } from '../users/register';
import { CareHomeSearch } from '../care-homes/care-home-search';
import { CareHomeBankingDetails } from '../care-homes/care-home-banking-details';
import { Payment } from '../payment/payment';
import { Config } from '../../providers/config';
import { LoginProvider } from '../../providers/login-provider';
import { Events } from 'ionic-angular';
import { ContactPage } from '../static/contact';
import { BankingDetailsPage } from '../users/banking-details';
import { DocLinks } from '../users/doc-links';
import { PhoneVerificationPage } from '../users/phone-verification';
import { Menu } from './menus';
import { HomeEvents } from '../../providers/home-events';

@Component({
    selector: 'admin-menus',
    templateUrl: 'admin-menus.html'
})
export class AdminMenus implements Menu {

    currentUser: any;
    registerCareHome = false;

    constructor(public navCtrl: NavController,
        public respUtility: ResponseUtility,
        public tokenService: Angular2TokenService,
        public config: Config,
        public events: Events,
        public homeEvents: HomeEvents,
        public loginProvider: LoginProvider) {

        this.homeEvents.registerMenu(this);

        // When the care home registration succeeds
        this.events.subscribe('care_home:registration:success', (care_home) => {
            console.log("AdminMenus: care_home:registration:success");
            this.tokenService.currentUserData["care_home_id"] = care_home.id;
            this.tokenService.currentUserData["care_home"] = care_home;
            this.currentUser = this.tokenService.currentUserData;
            this.displayMsgs();
        });

        this.currentUser = this.tokenService.currentUserData;
        this.displayMsgs();

        console.log("AdminMenus: Constructor");

    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter AdminMenus');
    }


    displayMsgs() {

        console.log("AdminMenus ", this.currentUser);

        if (this.currentUser && this.currentUser.role == "Admin") {

            if (this.currentUser.care_home_id == null) {
                this.registerCareHome = true;
                this.navCtrl.push(CareHomeSearch);
                this.respUtility.showWarning("Please register your care home and get it verified at the earliest.");
            } else if (this.currentUser.care_home) {
                if (!this.currentUser.care_home.verified) {
                    this.registerCareHome = false;
                    this.respUtility.showWarning("As part of our verification process, we will call your care home to verify your details.");
                } else if (this.currentUser.care_home.bank_account == null) {
                    this.respUtility.showWarning("Please enter your Bank details");
                }
            }

        }

        // If the user has request a verification code but not yet verified, 
        // send him to PhoneVerificationPage
        if (this.currentUser &&
            this.currentUser.phone_verified != true &&
            this.currentUser.sms_verification_code != null) {

            this.navCtrl.push(PhoneVerificationPage);

        }


    }

    show_profile() {
        this.navCtrl.push(UserDetails, this.currentUser);
    }

    register_care_home() {
        this.navCtrl.push(CareHomeSearch);
    }

    add_care_home_banking_details() {
        this.navCtrl.push(CareHomeBankingDetails, this.currentUser.care_home);
    }

    show_staffing_requests() {
        this.navCtrl.push(StaffingRequest);
    }

    new_staffing_request() {
        this.navCtrl.push(StaffingRequestForm);
    }

    phone_verification() {
        this.navCtrl.push(PhoneVerificationPage);
    }

    show_shifts(response_status) {
        this.navCtrl.push(Shift, { response_status: response_status });
    }

}