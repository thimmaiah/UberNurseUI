import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { CareHomeApi } from '../../providers/care-home-api';
import { ResponseUtility } from '../../providers/response-utility';
import { Events } from 'ionic-angular';
import {PostCodeValidator} from '../users/postcode-validator';
import { PostCodeApi } from '../../providers/postcode-api';


@Component({
  selector: 'page-care-home-form',
  templateUrl: 'care-home-form.html',
})
export class CareHomeForm {

  care_home: {};
  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public care_homeApi: CareHomeApi,
    public postCodeApi: PostCodeApi,
    public respUtility: ResponseUtility) {

    this.care_home = this.navParams.data;

    this.slideOneForm = formBuilder.group({
       
      name: ['', Validators.compose([Validators.required])],       
      address: ['', Validators.compose([Validators.required])], 
      phone: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^\\d+$')])],            
      postcode: ['', Validators.compose([Validators.minLength(7), Validators.required, new PostCodeValidator(this.postCodeApi).checkPostCode])],       
      image_url: ['']  
    });

    this.slideTwoForm = formBuilder.group({
            
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareHomesForm');
  }


  save() {
    this.submitAttempt = true;
    //console.log(this.care_home);
    let loader = this.loadingController.create({
      content: 'Saving ...'
    });

    if (!this.slideOneForm.valid) {
    }
    else {
      this.submitAttempt = false;
      loader.present();

      if (this.care_home["id"]) {
        this.care_homeApi.updateCareHome(this.care_home).subscribe(
          care_home => {
            this.respUtility.showSuccess('CareHome saved successfully.');    
            this.navCtrl.pop();        
          },
          error => {
            this.respUtility.showFailure(error);
            loader.dismiss();
            this.events.publish("care_home:registration:failed");
          },
          () => {loader.dismiss();}
        );
      } else {
        this.care_homeApi.createCareHome(this.care_home).subscribe(
          care_home => {
            this.events.publish("care_home:registration:success", care_home);                        
            this.navCtrl.popToRoot();
            //this.respUtility.showSuccess('CareHome saved successfully. We will inform you once this has been verified');
          },
          error => {
            this.respUtility.showFailure(error);
            loader.dismiss();
          },
          () => {loader.dismiss();}
        );
      }
    }
  }

}
