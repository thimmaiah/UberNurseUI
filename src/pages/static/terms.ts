import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularTokenService } from 'angular-token';


@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
@IonicPage({
  name: 'TermsPage'
})
export class TermsPage {

  currentUser: {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public tokenService: AngularTokenService) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsPage');
    this.currentUser = this.tokenService.currentUserData;
  }

}
