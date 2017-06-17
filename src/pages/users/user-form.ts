import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { UserApi } from '../../providers/user-api';
import { ResponseUtility } from '../../providers/response-utility';
import { Angular2TokenService } from 'angular2-token';
import { UserValidator } from './user-validator'
/**
 * Generated class for the UserForm page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-user-form',
  templateUrl: 'user-form.html',
})
export class UserForm {

  user: {};
  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  adminForm: FormGroup;
  careGiverForm: FormGroup;

  submitAttempt: boolean = false;
  confirm_password;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userApi: UserApi,
    public respUtility: ResponseUtility,
    public loadingController: LoadingController,
    private tokenService: Angular2TokenService) {

    this.user = this.navParams.data;


    this.slideOneForm = formBuilder.group({
      first_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      last_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      confirm_password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      role: [''],
      sex: [''],
      accept_terms: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.pattern('^\\d+$'),],
      postcode: ['', Validators.compose([Validators.required])],
      languages: ['', Validators.compose([Validators.pattern('[a-z, A-Z]*')])],
      pref_commute_distance: ['', Validators.compose([Validators.pattern('^\\d+$'), Validators.required])],
      speciality: ['', Validators.compose([Validators.pattern('[a-z, A-Z]*'), Validators.required])],
      experience: ['', Validators.compose([Validators.pattern('^\\d+$'), Validators.required])],
      bank_account: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.required])],
      sort_code: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(6), Validators.required])],
    }, { "validator": this.isMatching });

    this.onRoleChange(this.user["role"]);

    // Password may not be visible, hence disable validations 
    if (this.user["id"]) {
      this.slideOneForm.controls["password"].disable();
      this.slideOneForm.controls["password"].clearValidators();
      this.slideOneForm.controls["confirm_password"].disable();
      this.slideOneForm.controls["confirm_password"].clearValidators();
      this.slideOneForm.controls["terms"].disable();
      this.slideOneForm.controls["terms"].clearValidators();
      console.log("Disabled password", this.slideOneForm.controls.password.disabled);
    }


  }

  isMatching(group: FormGroup) {

    console.log(`password check`, group);

    let firstPassword = group.controls['password'].value;
    let secondPassword = group.controls['confirm_password'].value;
    if ((firstPassword && secondPassword) && (firstPassword != secondPassword)) {
      console.log("passwords mismatch");
      group.controls['confirm_password'].setErrors({ "pw_mismatch": true });
      return { "pw_mismatch": true };
    } else {
      return null;
    }
  }
  // Switch the madatory fields and validations based on the role
  onRoleChange(role) {
    console.log(`Role changed to ${role}`);

    var careGiverFields = ["languages", "pref_commute_distance", "speciality", "experience", "bank_account", "sort_code"];
    var arrayLength = careGiverFields.length;


    if (role == "Admin") {
      for (var i = 0; i < arrayLength; i++) {
        this.slideOneForm.controls[careGiverFields[i]].disable();
      }
    } else {
      for (var i = 0; i < arrayLength; i++) {
        this.slideOneForm.controls[careGiverFields[i]].enable();
      }
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserForm');
  }


  save() {

    this.submitAttempt = true;
    //console.log(this.user);
    let loader = this.loadingController.create({
      content: 'Saving ...'
    });

    if (this.slideOneForm.invalid) {
      //this.signupSlider.slideTo(0);
      console.log("Invalid form ", this.slideOneForm.errors);
    }
    else {
      this.submitAttempt = false;
      loader.present();
      if (this.user["id"]) {
        this.userApi.updateUser(this.user).subscribe(
          user => {
            this.respUtility.showSuccess('User saved successfully.');
          },
          error => {
            this.respUtility.showFailure(error);
            loader.dismiss();
          },
          () => { loader.dismiss(); }
        );
      } else {
        this.register(this.user, loader);
      }
    }
  }

  register(user, loader) {
    this.tokenService.registerAccount(user).subscribe(
      res => {
        console.log(res);
        this.respUtility.showSuccess("Please check your email for verification link. Verfiy your email & then login.");
        this.navCtrl.popToRoot();
      },
      error => {
        console.log(error);
        if (error.status == 401) {
          let body = JSON.parse(error._body);
          this.respUtility.showWarning(body.errors);
        } else {
          this.respUtility.showFailure(error);
          loader.dismiss();
        }
      },
      () => { loader.dismiss(); }
    );
  }

}
