import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CareHomeApi } from '../../providers/care-home-api';
import { ResponseUtility } from '../../providers/response-utility';
/**
 * Generated class for the CareHomeSearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-care-home-search',
  templateUrl: 'care-home-search.html',
})
export class CareHomeSearchPage {

  search = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    public care_homeApi: CareHomeApi,
    public respUtility: ResponseUtility) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareHomeSearchPage');
  }

}
