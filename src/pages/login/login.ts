import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../providers/token-service';
import { Angular2TokenService } from 'angular2-token';
import { ResponseUtility } from '../../providers/response-utility';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  //email: any = "thimmaiah@gmail.com";
  //password: any = "thimmaiah@gmail.com";

  email: any = "admin@ubernurse.com";
  password: any = "admin@ubernurse.com";


  slideOneForm: FormGroup;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public respUtility: ResponseUtility,
    private tokenService: Angular2TokenService) {


    this.slideOneForm = formBuilder.group({
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  login() {
    this.tokenService.signIn({ email: this.email, password: this.password }).subscribe(
      res => {
        console.log(res);
        this.tokenService.validateToken().subscribe(
          res => console.log(res),
          error => console.log(error)
        );

        this.navCtrl.popToRoot();
      },
      error => {
        console.log(error);
        if(error.status == 401) {
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
