import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { UserForm } from '../users/user-form';
import { UserApi } from '../../providers/user-api';
import { ResponseUtility } from '../../providers/response-utility';
/**
 * Generated class for the UserDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetails {

  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userApi: UserApi,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public respUtility: ResponseUtility) {
    this.user = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetails');
  }

  editUser(user) {
    this.navCtrl.push(UserForm, user);
  }

  deleteUser(user) {

    let loader = this.loadingController.create({
      content: 'Deleting User...'
    });

    loader.present();

    this.userApi.deleteUser(user).subscribe(
      response => {
        this.respUtility.showSuccess("Deleted User");
        this.navCtrl.pop();
      },
      error => {
        this.respUtility.showFailure(error);
        loader.dismiss();
      },
      () => { loader.dismiss(); }
    );
  }

  confirmDelete(user) {
    this.respUtility.confirmDelete(this.deleteUser.bind(this), user);
  }
}
