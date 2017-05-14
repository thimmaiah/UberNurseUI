import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { UserForm } from '../users/user-form';
import { UserPic } from '../user-pic/user-pic';
import { UserApi } from '../../providers/user-api';
import { ResponseUtility } from '../../providers/response-utility';
import { UserDoc } from '../user-doc/user-doc';
import * as _ from 'lodash';

@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetails {

  user: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public userApi: UserApi,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public respUtility: ResponseUtility) {
    
    this.user = this.navParams.data;
    
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserDetails');
    // Always reload the user from the server for a fresh copy
    this.loadUser();
  }

  editUser(user) {
    this.navCtrl.push(UserForm, user);
  }

  loadUser() {
    let loader = this.loadingController.create({
      content: 'Loading User...'
    });

    loader.present();

    this.userApi.getUserDetails(this.user.id).subscribe(
      response => {
        this.respUtility.showSuccess("Loaded User");
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

  pendingDocs() {
    let required = ["ID Card", "Certificate", "Address Proof", "Profile Pic"]
    let pending = _.dropWhile(required, (required_type) => {
      let found = _.find(this.user.user_docs, function (doc) { return doc.doc_type == required_type; });
      return found != null;
    });
    return _.map(pending, (doc_type) => { return { name: "Not Uploaded", doc_type: doc_type } });
  }

  uploadNow(doc) {
    this.navCtrl.push(UserPic, doc);
  }

  viewDoc(doc) {
    this.navCtrl.push(UserDoc, doc);
  }

  getDocColorAndText(doc) {
    switch (doc.verified) {
      case true: {
        return ["secondary", "Verified"];
      }
      case false: {
        return ["danger", "Rejected"];
      }
      default: {
        return ["primary", "Pending Verification"];
      }
    }
  }
}
