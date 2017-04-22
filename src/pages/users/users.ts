import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserApi} from '../../providers/user-api';

/**
 * Generated class for the Users page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class Users {

  users: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userApi: UserApi) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Users');
    this.userApi.getUsers().subscribe(users=>{
      this.users = users;
      console.log("Loaded users");
    })
  }

}
