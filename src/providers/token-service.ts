import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Angular2TokenService } from 'angular2-token';


@Injectable()
export class TokenService {

  constructor(public http: Http, public _tokenService: Angular2TokenService) {
    this._tokenService.init({
      apiBase: "http://localhost:3000"
    });
    console.log('Hello TokenService Provider');
  }

}
