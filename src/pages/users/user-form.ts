import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { UserApi } from '../../providers/user-api';
import { ResponseUtility } from '../../providers/response-utility';
import { Angular2TokenService } from 'angular2-token';

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
  slideTwoForm: FormGroup;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userApi: UserApi,
    public respUtility: ResponseUtility,
    public loadingController: LoadingController,
    private tokenService: Angular2TokenService) {

    this.user = this.navParams.data;
    
    this.slideOneForm = formBuilder.group({
      first_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      last_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: [''],
      role: [''],
      sex: [''],
      phone: ['', Validators.pattern('^\\d+$'),],
      postcode: ['', Validators.compose([Validators.required])],
      languages: ['', Validators.compose([Validators.pattern('[a-z, A-Z]*')])],
      pref_commute_distance: ['', Validators.compose([Validators.pattern('^\\d+$')])],
      speciality: ['', Validators.compose([Validators.pattern('[a-z, A-Z]*')])],
      experience: ['', Validators.compose([Validators.pattern('^\\d+$')])],
      bank_account: [''],
      sort_code: ['']
    });


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

    if (!this.slideOneForm.valid) {
      //this.signupSlider.slideTo(0);
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
        this.navCtrl.popToRoot();

      },
      error => {
        console.log(error);
        if (error.status == 401) {
          let body = JSON.parse(error._body);
          this.respUtility.showWarning(body.errors);
        } else {
          this.respUtility.showFailure(error);
        }
      },
      () => { loader.dismiss(); }
    );
  }

}
