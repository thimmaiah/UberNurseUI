import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CareHomeApi } from '../../providers/care-home-api';
import { ResponseUtility } from '../../providers/response-utility';
import { CareHomeDetails } from '../care-homes/care-home-details';
import { CareHomeForm } from '../care-homes/care-home-form';
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

    let loader = this.loadingController.create({
      content: 'Loading CareHomes...'
    });
    loader.present();

    this.care_homeApi.getCareHomes().subscribe(
      CareHome => {
        this.care_homes = CareHome;
        console.log("Loaded CareHome");
        console.log(this.care_homes);
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

  newCareHome() {
    let care_home = {};
    this.navCtrl.push(CareHomeForm,care_home);
  }
}
