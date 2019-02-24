import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { AgencyApi } from '../../providers/agency-api';
import { ResponseUtility } from '../../providers/response-utility';

@Component({
  selector: 'page-agency-form',
  templateUrl: 'agency-form.html'
})
export class AgencyForm {

  agency: {};
  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;
  pricing_audit_keys = [];

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingController: LoadingController, 
    public agencyApi: AgencyApi,
    public respUtility: ResponseUtility) {

    this.agency = this.navParams.data;
    this.pricing_audit_keys = Object.keys(this.agency["pricing_audit"]);

    this.slideOneForm = formBuilder.group({
              
      name: ['', Validators.compose([Validators.required])],
      
      broadcast_group: [''],

      address: [''],

      phone: ['', Validators.compose([Validators.required])],
        
    });

    this.slideTwoForm = formBuilder.group({
      
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgenciesForm');
  }


  save() {
    this.submitAttempt = true;
    //console.log(this.agency);
    let loader = this.loadingController.create({
      content: 'Saving ...'
    });

    
    if (!this.slideOneForm.valid) {
      
    }
    
    else {
      this.submitAttempt = false;
      loader.present();
  
      if (this.agency["id"]) {
        this.agencyApi.updateAgency(this.agency).subscribe(
          agency => {
            this.respUtility.showSuccess('Agency saved successfully.');
          },
          error => {
            this.respUtility.showFailure(error);
            loader.dismiss();
          },
          () => { loader.dismiss(); }
        );
      } else {
        this.agencyApi.createAgency(this.agency).subscribe(
          agency => {
            this.respUtility.showSuccess('Agency saved successfully.');
          },
          error => {
            this.respUtility.showFailure(error);
            loader.dismiss();
          },
          () => { loader.dismiss(); }
        );
      }
    }
  }

}
