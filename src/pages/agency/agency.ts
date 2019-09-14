import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AgencyApi } from '../../providers/agency-api';
import { ResponseUtility } from '../../providers/response-utility';
import { AgencyUserMappingApi } from '../../providers/agency-user-mapping-api';
import { AgencyCareHomeMappingApi } from '../../providers/agency-care-home-mapping-api';
import { AngularTokenService } from 'angular-token';



@IonicPage()
@Component({
  selector: 'page-agency',
  templateUrl: 'agency.html',
})
export class Agency {

  mappings: any;
  mapping: any;
  currentUser: any;
  page = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingController: LoadingController,
    public tokenService: AngularTokenService,
    public agencyApi: AgencyApi,
    public aumApi: AgencyUserMappingApi,
    public acmApi: AgencyCareHomeMappingApi,
    public respUtility: ResponseUtility) {

    this.currentUser = this.tokenService.currentUserData;

    this.loadMappings();

  }



  ionViewWillEnter() {
    this.currentUser = this.tokenService.currentUserData;
    console.log('ionViewWillEnter mappings ' + this.currentUser);
    this.respUtility.trackView("mappings");
  }

  loadMappings() {
    let loader = this.loadingController.create({
      content: `Loading mappings...`
    });

    loader.present();
    let api = null;
    if (this.currentUser.care_home_id != null) {
      api = this.acmApi.getAgencyCareHomeMappings("", 1);
    } else {
      api = this.aumApi.getAgencyUserMappings("", 1);
    }

    api.subscribe(
      mappings => {
        if (this.mappings == null) {
          this.mappings = [];
        }

        if (mappings.length > 0) {
          this.mappings = this.mappings.concat(mappings);
          console.log("Loaded mappings");
          console.log(this.mappings);
        }
      },
      error => { this.respUtility.showFailure(error); loader.dismiss(); },
      () => {
        loader.dismiss();
      }
    );

  }

  getAgencyDetails(mapping) {
    this.mapping = mapping;
    this.navCtrl.push('AgencyDetails', mapping);
  }

}
