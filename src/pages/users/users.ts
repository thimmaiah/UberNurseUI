import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserApi } from '../../providers/user-api';
import { ResponseUtility } from '../../providers/response-utility';
import { UserDetails } from '../users/user-details'

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
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingController: LoadingController, 
    public userApi: UserApi, public respUtility: ResponseUtility) {
  }

  

  ionViewWillEnter() {
    console.log('ionViewWillEnter Users');

    let loader = this.loadingController.create({
      content: 'Loading Users...'
    });


    this.userApi.getUsers().subscribe(
      users => {
        this.users = users;
        console.log("Loaded users");
      },
      error => { this.respUtility.showFailure(error); },
      () => { loader.dismiss(); }
    );

  }

  getUserDetails(user) {
    let loader = this.loadingController.create({
      content: 'Loading Users...'
    });

    loader.present()
    this.userApi.getUserDetails(user.id).subscribe(
      user => {
        this.user = user;
        console.log("got user " + user);
        this.navCtrl.push(UserDetails, user);
      },
      error => { this.respUtility.showFailure(error); },
      () => { loader.dismiss(); }
    );

  }
}
