import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CareHomeApi } from '../../providers/care-home-api';
import { CqcRecordApi } from '../../providers/cqc-record-api';
import { ResponseUtility } from '../../providers/response-utility';
import { CareHomeForm } from '../care-homes/care-home-form';
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
export class CareHomeSearch {

  searchTerm = "";
  cqc_records = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public care_homeApi: CareHomeApi,
    public cqcApi: CqcRecordApi,
    public respUtility: ResponseUtility) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareHomeSearchPage');
  }

  loadCareHomes(searchTerm) {
    let loader = this.loadingController.create({
      content: 'Loading CareHomes...'
    });
    loader.present();

    this.cqcApi.getCqcRecords(searchTerm).subscribe(
      cqc_records => {
        this.cqc_records = cqc_records;
        console.log("Loaded CareHome");
        console.log(this.cqc_records);
      },
      error => { this.respUtility.showFailure(error); loader.dismiss(); },
      () => { loader.dismiss(); }
    );
  }

  onSearch(event) {
    if (this.searchTerm) {
      this.loadCareHomes(this.searchTerm);
    } else {
      this.cqc_records = null;
    }
  }

  onCancel() {
    this.searchTerm = "";
  }

  newCareHome(cqc) {
    let care_home = {};
    if (cqc) {
      care_home = {
        name: cqc.name, postcode: cqc.postcode,
        phone: cqc.phone, address: cqc.address,
        cqc_location: cqc.cqc_location
      };
    }
    this.navCtrl.push(CareHomeForm, care_home);
  }
}
