import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../providers/token-service';
import { Angular2TokenService } from 'angular2-token';
import { ResponseUtility } from '../../providers/response-utility';
import { Config } from '../../providers/config';
import { UserApi } from '../../providers/user-api';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  email: any = "thimmaiah@gmail.com";
  password: any = "thimmaiah@gmail.com";

  //email: any = "admin@ubernurse.com";
  //password: any = "admin@ubernurse.com";


  slideOneForm: FormGroup;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public respUtility: ResponseUtility,
    public loadingController: LoadingController,
    private tokenService: Angular2TokenService,
    private config: Config,
    private userApi: UserApi) {


    this.slideOneForm = formBuilder.group({
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  login() {

    let loader = this.loadingController.create({
      content: 'Login in progress ...'
    });

    loader.present();

    this.tokenService.signIn({ email: this.email, password: this.password }).subscribe(
      res => {
        console.log(res);
        // Save the push token now that the user is logged in
        console.log(this.tokenService.currentUserData);
        let user = {
          id: this.tokenService.currentUserData.id,
          push_token: this.config.props["push_token"],
          user: { id: this.tokenService.currentUserData.id, push_token: this.config.props["push_token"] }
        };

        this.userApi.updateUser(user).subscribe(resp => {
          console.log("Saved push_token to server");
        },
          error => {
            console.log("Failed to save push_token to server. Notification will not work !!");
          });

        loader.dismiss();
        this.navCtrl.popToRoot();
      },
      error => {
        console.log(error);
        loader.dismiss();
        if (error.status == 401) {
          let body = JSON.parse(error._body);
          this.respUtility.showWarning(body.errors);
        } else {
          this.respUtility.showFailure(error);
        }
      }
    );
  }

  register() {

  }

  forgotPassword() {

  }
}
