import { Component } from '@angular/core';
import { InfiniteScroll, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CareHomeApi } from '../../providers/care-home-api';
import { ResponseUtility } from '../../providers/response-utility';
import { CareHomeDetails } from '../care-homes/care-home-details';
import { CareHomeForm } from '../care-homes/care-home-form';
import { CareHomeSearch } from '../care-homes/care-home-search';
import { Angular2TokenService } from 'angular2-token';


/**
 * Generated class for the CareHomes page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-CareHome',
  templateUrl: 'care-homes.html',
})
export class CareHomes {

  care_homes: any;
  care_home: any;
  current_user: any;
  searchTerm = "";
  page = 1;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public care_homeApi: CareHomeApi,
    private tokenService: Angular2TokenService,
    public respUtility: ResponseUtility) {

      this.current_user = tokenService.currentUserData;

  }



  ionViewWillEnter() {
    console.log('ionViewWillEnter CareHomes');
    this.loadCareHomes("", 1, null);
  }

  loadCareHomes(searchTerm, page, infiniteScroll:InfiniteScroll) {
    let loader = this.loadingController.create({
      content: 'Loading Care Homes...'
    });
    loader.present();

    this.care_homeApi.getCareHomes(searchTerm, page).subscribe(
      care_homes => {

        if (this.care_homes == null) {
          this.care_homes = [];
        }

        if (care_homes.length > 0) {
          this.care_homes = this.care_homes.concat(care_homes);
          console.log("Loaded care homes");
          if (infiniteScroll) {
            infiniteScroll.enable(true);
          }
        } else {
          if (infiniteScroll) {
            infiniteScroll.enable(false);
          }
        }

      },
      error => { this.respUtility.showFailure(error); loader.dismiss(); },
      () => { loader.dismiss(); }
    );
  }

  getCareHomeDetails(care_home) {
    let loader = this.loadingController.create({
      content: 'Loading CareHomes...'
    });

    loader.present()
    this.care_homeApi.getCareHomeDetails(care_home.id).subscribe(
      care_home => {
        this.care_home = care_home;
        console.log("got care_home " + care_home);
        this.navCtrl.push(CareHomeDetails, care_home);
      },
      error => { this.respUtility.showFailure(error); },
      () => { loader.dismiss(); }
    );

  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    console.log('loadMorepayments, start is currently ' + this.page);
    this.page += 1;
    infiniteScroll.enable(false);
    this.loadCareHomes("", this.page, infiniteScroll);
    infiniteScroll.complete();
  }

  newCareHome() {
    let care_home = {};
    this.navCtrl.push(CareHomeSearch);
  }

  onSearch(event) {
    this.care_homes = null;
    this.loadCareHomes(this.searchTerm, 1, null);
  }

  onCancel() {
    this.searchTerm = "";
  }
}
