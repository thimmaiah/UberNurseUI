import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { UserForm } from '../users/user-form';
import { DocLinks } from './doc-links';
import { UserPic } from '../user-pic/user-pic';
import { UserApi } from '../../providers/user-api';
import { ResponseUtility } from '../../providers/response-utility';
import { UserDoc } from '../user-doc/user-doc';
import { BankingDetailsPage } from './banking-details';
import { CareHomeBankingDetails } from '../care-homes/care-home-banking-details';
import { CareHomeForm } from '../care-homes/care-home-form';

import * as _ from 'lodash';

@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetails extends DocLinks {

  user: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userApi: UserApi,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public respUtility: ResponseUtility) {

    super(navCtrl);
    this.user = this.navParams.data;

  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserDetails');
    this.respUtility.trackView("UserDetails");
    // Always reload the user from the server for a fresh copy
    this.loadUser();
  }

  editUser(user) {
    this.respUtility.trackEvent("User", "Edit", "click");
    this.navCtrl.push(UserForm, user);
  }

  loadUser() {
    let loader = this.loadingController.create({
      content: 'Loading User...'
    });

    loader.present();

    this.userApi.getUserDetails(this.user.id).subscribe(
      response => {
        //this.respUtility.showSuccess("Loaded User");
        this.user = response;
      },
      error => {
        this.respUtility.showFailure(error);
        loader.dismiss();
      },
      () => { loader.dismiss(); }
    );
  }

  deactivateUser(user) {
    this.respUtility.trackEvent("User", "Deactivate", "click");
    let loader = this.loadingController.create({
      content: 'Deactivating User...'
    });

    user.active = false;
    loader.present();

    this.userApi.updateUser(user).subscribe(
      response => {
        this.respUtility.showSuccess("Deactivated User");
        this.navCtrl.pop();
      },
      error => {
        this.respUtility.showFailure(error);
        loader.dismiss();
      },
      () => { loader.dismiss(); }
    );
  }

  confirmDeactivate(user) {
    this.respUtility.confirmAction(this.deactivateUser.bind(this), user, "Deactivate User. Confirm?");
  }

  editUserBankingDetails(user) {
    this.respUtility.trackEvent("User", "EditBankingDetails", "click");
    this.navCtrl.push(BankingDetailsPage, user);
  }

  editCareHomeBankingDetails(user) {
    this.respUtility.trackEvent("User", "EditCareHomeBankingDetails", "click");
    this.navCtrl.push(CareHomeBankingDetails, user.care_home);
  }

  editCareHome(user) {
    this.respUtility.trackEvent("User", "EditCareHome", "click");
    this.navCtrl.push(CareHomeForm, user.care_home);
  }

}
