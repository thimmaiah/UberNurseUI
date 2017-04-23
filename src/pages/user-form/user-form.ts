import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import {UserApi} from '../../providers/user-api'

/**
 * Generated class for the UserForm page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-form',
  templateUrl: 'user-form.html',
})
export class UserForm {

  user: {};
  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public formBuilder: FormBuilder, public userApi: UserApi) {

    this.user = this.navParams.data;

    this.slideOneForm = formBuilder.group({
      first_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      last_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      role: [''],
      sex: [''],
      phone: ['', Validators.pattern('^\\d+$'),]      
    });

    this.slideTwoForm = formBuilder.group({
      address: ['', Validators.compose([Validators.required, Validators.pattern('[0-9a-z, A-Z]*')])],
      languages: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      pref_commute_distance: ['', Validators.compose([Validators.required, Validators.pattern('^\\d+$')])],
      occupation: ['', Validators.compose([Validators.pattern('[a-z, A-Z]*')])],
      speciality: ['', Validators.compose([Validators.required, Validators.pattern('[a-z, A-Z]*')])],
      experience: ['', Validators.compose([Validators.required, Validators.pattern('^\\d+$')])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserForm');
  }


  next() {
    this.signupSlider.slideNext();
  }

  prev() {
    this.signupSlider.slidePrev();
  }

  save() {
    this.submitAttempt = true;
    //console.log(this.user);
    

    if (!this.slideOneForm.valid) {
      this.signupSlider.slideTo(0);
    }
    else if (!this.slideTwoForm.valid) {
      this.signupSlider.slideTo(1);
    }
    else {
      if(this.user["id"]) {
        this.userApi.updateUser(this.user).subscribe(user=>{
          console.log("Updated user")
        });
      } else {
        this.userApi.createUser(this.user).subscribe(user=>{
          console.log("Created user")
        });
      }
    }
  }

}
