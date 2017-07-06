import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { UserApi } from '../../providers/user-api';
import { ResponseUtility } from '../../providers/response-utility';
import { Angular2TokenService } from 'angular2-token';
import { UserValidator } from './user-validator'
import { TermsPage } from '../static/terms';
import { PostCodeValidator } from './postcode-validator';
import { PostCodeApi } from '../../providers/postcode-api';
import { CheckboxValidator } from '../../providers/checkbox-validator';

@Component({
  selector: 'page-user-form',
  templateUrl: 'user-form.html',
})
export class UserForm {

  user: {};
  @ViewChild('signupSlider') signupSlider: any;
  @ViewChild('title') title;

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
    private tokenService: Angular2TokenService,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private keyboard: Keyboard,
    private postCodeApi: PostCodeApi) {

    this.user = this.navParams.data;


    this.slideOneForm = formBuilder.group({
      first_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      last_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      confirm_password: ['', Validators.compose([Validators.required])],
      title: [''],
      accept_terms: ['', Validators.compose([CheckboxValidator.isChecked, Validators.required])],
      phone: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^\\d+$')])],
      postcode: ['', Validators.compose([Validators.minLength(7), Validators.required, new PostCodeValidator(this.postCodeApi).checkPostCode])],
      pref_commute_distance: ['', Validators.compose([Validators.pattern('^\\d+$'), Validators.required])],
    }, { "validator": this.isMatching });

    this.onRoleChange(this.user["role"]);

    // Password may not be visible, hence disable validations 
    if (this.user["id"]) {
      this.slideOneForm.controls["password"].disable();
      this.slideOneForm.controls["password"].clearValidators();
      this.slideOneForm.controls["confirm_password"].disable();
      this.slideOneForm.controls["confirm_password"].clearValidators();
      console.log("Disabled password", this.slideOneForm.controls.password.disabled);
    }

  }

  onTermsChecked($event) {
    if (!$event.checked) {
      this.slideOneForm.patchValue({ accept_terms: null });
    }
  }

  isMatching(group: FormGroup) {


    let firstPassword = group.controls['password'].value;
    let secondPassword = group.controls['confirm_password'].value;
    console.log(`password check ${firstPassword}, ${secondPassword}`);


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

    var careGiverFields = ["pref_commute_distance", "postcode"];
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

  onTitleChange(title) {
    const element = this.elementRef.nativeElement.querySelector('title');
    // we need to delay our call in order to work with ionic ...
    setTimeout(() => {
      this.renderer.invokeElementMethod(element, 'focus', []);
      this.keyboard.show();
    }, 0);
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

  show_terms() {
    this.navCtrl.push(TermsPage);
  }

}
