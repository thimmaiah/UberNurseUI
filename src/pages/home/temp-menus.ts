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

@Component({
    selector: 'temp-menus',
    templateUrl: 'temp-menus.html'
})
export class TempMenus extends DocLinks {

    currentUser: any;

    constructor(public navCtrl: NavController,
        public respUtility: ResponseUtility,
        private tokenService: Angular2TokenService,
        private config: Config,
        public events: Events,
        private loginProvider: LoginProvider) {

        super(navCtrl);
        this.currentUser = this.tokenService.currentUserData;
        this.displayMsgs();

        // When the user logout succeeds
        events.subscribe('user:logout:success', () => {
            console.log("HomePage: user:logout:success");
            this.currentUser = null;
        });

        // When the user login succeeds
        events.subscribe('user:login:success', () => {
            console.log("HomePage: user:login:success");
            this.currentUser = this.tokenService.currentUserData;
            this.displayMsgs();
        });


        events.subscribe('current_user:reload', () => {
            console.log("HomePage: current_user:reload");
            this.tokenService.validateToken().subscribe(
                resp => {
                    console.log(resp);
                    let body = JSON.parse(resp["_body"]);
                    this.currentUser = body["data"];
                },
                err => { console.log(err) }
            );
            this.displayMsgs();
        });

    }

    displayMsgs() {

        console.log(this.currentUser);

        if (this.currentUser &&
            (this.currentUser.role == "Care Giver" || this.currentUser.role == "Nurse")) {
            if (this.currentUser.verified !== true) {
                this.respUtility.showWarning("Please upload your documents for verification");
            } else if (this.currentUser.bank_account == null) {
                this.respUtility.showWarning("Please enter your Bank details");
            }
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



}