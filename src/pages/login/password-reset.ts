import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../providers/token-service';
import { AngularTokenService } from 'angular-token';
import { ResponseUtility } from '../../providers/response-utility';
import { Config } from '../../providers/config';
import { Http, RequestOptions, Headers } from '@angular/http';


@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordReset {

  token: any;
  password: any;
  confirm_password: any;
  headerInfo = {};

  slideOneForm: FormGroup;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public respUtility: ResponseUtility,
    public loadingController: LoadingController,
    private tokenService: AngularTokenService,
    private config: Config,
    private http: Http) {


    this.slideOneForm = formBuilder.group({
      token: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirm_password: ['', Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  reset() {

    if(this.password != this.confirm_password) {
      this.respUtility.showWarning("Passwords dont match, please re-enter the password and confirm.")
    } else {

      let loader = this.loadingController.create({
        content: 'Reset in progress ...'
      });

      loader.present();
      this.http.post(`${this.config.props["API_URL"]}/users/reset_password.json`, {token: this.token, password: this.password}).subscribe(
        res => {
          console.log(res);
          this.headerInfo = res.json();
          loader.dismiss();
          console.log(this.headerInfo);
          if(this.headerInfo["reset"] == true) {
            this.respUtility.showSuccess("Password reset successfully, please login with the new password.")
            this.navCtrl.pop();
          } else {
            this.respUtility.showWarning("Password reset failed, please contact support.")
          }
          
        },
        error => {
          console.log(error);
          loader.dismiss();
          this.respUtility.showFailure(error);
        }
      );

    }
  }

}
