import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import {UserForm} from '../user-form/user-form'
import {UserApi} from '../../providers/user-api'
/**
 * Generated class for the UserDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetails {

  user: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public userApi: UserApi, public alertController: AlertController, 
  public toastController: ToastController) {
    this.user = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetails');
  }

  editUser(user) {
    this.navCtrl.push(UserForm, user);
  }

  delteUser(user) {

  }

}
