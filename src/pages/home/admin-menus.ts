import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login-provider';
import { ResponseUtility } from '../../providers/response-utility';
import { Config } from '../../providers/config';
import { Events } from 'ionic-angular';
import { Menu } from './menus';
import { HomeEvents } from '../../providers/home-events';
@Component({
    selector: 'admin-menus',
    templateUrl: 'admin-menus.html'
})
export class AdminMenus implements Menu {

    currentUser: any;
    registerCareHome = false;
    @Input() initData: any;

    constructor(public navCtrl: NavController,
        public respUtility: ResponseUtility,
        public config: Config,
        public events: Events,
        public homeEvents: HomeEvents,
        public loginProvider: LoginProvider) {

        this.homeEvents.registerMenu(this);

        // When the care home registration succeeds
        this.events.subscribe('care_home:registration:success', (care_home) => {
            console.log("AdminMenus: care_home:registration:success");
            this.loginProvider.currentUser["care_home_id"] = care_home.id;
            this.loginProvider.currentUser["care_home"] = care_home;
            this.currentUser = this.loginProvider.currentUser;
            this.displayMsgs();
        });

        this.currentUser = this.loginProvider.currentUser;
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
                this.navCtrl.push('CareHomeSearch');
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

            this.navCtrl.push('PhoneVerificationPage');

        }


    }

    show_agencies() {
        this.navCtrl.push('Agency');
    }

    show_profile() {
        this.navCtrl.push('UserDetails', this.currentUser);
    }

    register_care_home() {
        this.navCtrl.push('CareHomeSearch');
    }

    add_care_home_banking_details() {
        this.navCtrl.push('CareHomeBankingDetails', this.currentUser.care_home);
    }

    show_staffing_requests() {
        this.navCtrl.push('StaffingRequest');
    }

    new_staffing_request() {
        this.navCtrl.push('StaffingRequestForm');
    }

    new_recurring_request() {
        this.navCtrl.push('RecurringRequestForm');
    }

    view_recurring_request() {
        this.navCtrl.push('RecurringRequest');
    }

    phone_verification() {
        this.navCtrl.push('PhoneVerificationPage');
    }

    show_shifts(response_status) {
        this.navCtrl.push('Shift', { response_status: response_status });
    }

}