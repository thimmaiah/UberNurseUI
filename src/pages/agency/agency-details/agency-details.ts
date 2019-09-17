import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AgencyApi } from '../../../providers/agency-api';
import { AgencyUserMappingApi } from '../../../providers/agency-user-mapping-api';
import { AgencyCareHomeMappingApi } from '../../../providers/agency-care-home-mapping-api';
import { ResponseUtility } from '../../../providers/response-utility';
import { LoginProvider } from '../../../providers/login-provider';

@IonicPage()
@Component({
  selector: 'page-agency-details',
  templateUrl: 'agency-details.html',
})
export class AgencyDetails {

  mapping: any;
  currentUser: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public agencyApi: AgencyApi,
    public aumApi: AgencyUserMappingApi,
    public acmApi: AgencyCareHomeMappingApi,
    public loadingController: LoadingController,
    private loginProvider: LoginProvider,
    public respUtility: ResponseUtility) {

    this.mapping = this.navParams.data;
    this.currentUser = this.loginProvider.currentUser;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgenciesDetails');
  }

  accept() {
    let api = null;
    this.mapping.accepted = true;
    if (this.currentUser.care_home_id != null) {
      api = this.acmApi.updateAgencyCareHomeMapping(this.mapping);
    } else {
      api = this.aumApi.updateAgencyUserMapping(this.mapping);
    }

    let loader = this.loadingController.create({
      content: 'Saving ...'
    });

    api.subscribe(
      mapping => {
        this.respUtility.showSuccess('Saved successfully.');
        this.navCtrl.pop();
      },
      error => {
        this.respUtility.showFailure(error);
        loader.dismiss();
      },
      () => { loader.dismiss(); }
    );

  }

}
