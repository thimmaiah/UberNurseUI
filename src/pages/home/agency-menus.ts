import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login-provider';
import { ResponseUtility } from '../../providers/response-utility';
import { Config } from '../../providers/config';
import { Events } from 'ionic-angular';
import { Menu } from './menus';
import { HomeEvents } from '../../providers/home-events';

@Component({
    selector: 'agency-menus',
    templateUrl: 'agency-menus.html'
})
export class AgencyMenus implements Menu {

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
        this.currentUser = this.loginProvider.currentUser;
        this.displayMsgs();

        console.log("AgencyMenus: Constructor");

    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter AgencyMenus');
    }


    displayMsgs() {

        console.log("AgencyMenus ", this.currentUser);

    }

    impersonate() {

    }


    impersonateForm() {
        this.navCtrl.push("ImpersonatePage");
    }
}