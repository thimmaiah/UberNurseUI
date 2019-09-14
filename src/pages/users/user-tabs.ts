import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';

import { UserApi } from '../../providers/user-api';
import { ResponseUtility } from '../../providers/response-utility';
import { CareHomeBankingDetails } from '../care-homes/care-home-banking-details';
import { CareHomeDetails } from '../care-homes/care-home-details';
import { QrCode } from '../care-homes/qr_code';

import * as _ from 'lodash';

@Component({
  selector: 'page-user-tabs',
  templateUrl: 'user-tabs.html',
})
export class UserTabs  {

  user: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root = 'UserDetails';
  tab2Root: any; 
  tab3Root: any;
  tab4Root: any;
  tabIndex = 0;
  params = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userApi: UserApi,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public respUtility: ResponseUtility) {

    this.user = this.navParams.data;
    if(this.user.role == "Admin") {
      this.tab2Root = CareHomeBankingDetails;
      this.tab3Root = CareHomeDetails;
      this.tab4Root = QrCode;
    } else {
      this.tab2Root = 'BankingDetailsPage';
    }

    this.params = {showNavBar: false, user: this.user};

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserTabs');
  }

  tabClick(event:MouseEvent) {
    console.log("UserTabs: tabClick", event);
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}
