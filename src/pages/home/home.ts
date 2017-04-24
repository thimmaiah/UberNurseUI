import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private _tokenService: Angular2TokenService) {
    this._tokenService.init();
  }

}
