import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';
import { ResponseUtility } from '../../providers/response-utility';
import { Shift } from '../shift/shift';
import { UserDetails } from '../users/user-details';
import { UserForm } from '../users/user-form';
import { Config } from '../../providers/config';
import { LoginProvider } from '../../providers/login-provider';
import { Events } from 'ionic-angular';
import { ContactPage } from '../static/contact';
import { BankingDetailsPage } from '../users/banking-details';
import { DocLinks } from '../users/doc-links';
import { Menu } from './menus';
import { HomeEvents } from '../../providers/home-events';
import { PhoneVerificationPage } from '../users/phone-verification';

@Component({
    selector: 'temp-menus',
    templateUrl: 'temp-menus.html'
})
export class TempMenus extends DocLinks implements Menu {

    currentUser: any;

    constructor(public navCtrl: NavController,
        public respUtility: ResponseUtility,
        private tokenService: Angular2TokenService,
        private config: Config,
        public events: Events,
        public homeEvents: HomeEvents,
        private loginProvider: LoginProvider) {

        super(navCtrl);
        this.homeEvents.registerMenu(this);

        this.currentUser = this.tokenService.currentUserData;
        this.displayMsgs();

        console.log("TempMenus: Constructor");
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter TempMenus');
    }


    displayMsgs() {

        console.log("TempMenus", this.currentUser);

        if (this.currentUser &&
            (this.currentUser.role == "Care Giver" || this.currentUser.role == "Nurse")) {
            if (this.currentUser.verified !== true) {
                this.respUtility.showWarning("Please upload your documents for verification");
            } else if (this.currentUser.bank_account == null) {
                this.respUtility.showWarning("Please enter your Bank details");
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

    add_banking_details() {
        this.navCtrl.push(BankingDetailsPage);
    }


    show_shifts(response_status) {
        this.navCtrl.push(Shift, { response_status: response_status });
    }

    show_profile() {
        this.navCtrl.push(UserDetails, this.currentUser);
    }

    phone_verification() {
        this.navCtrl.push(PhoneVerificationPage);
    }


}