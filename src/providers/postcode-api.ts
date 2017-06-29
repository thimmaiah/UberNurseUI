import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Angular2TokenService } from 'angular2-token';


@Injectable()
export class PostCodeApi {

  private base_url = "post_codes";
  post_codes = [];
  post_code = {};

  constructor(public http: Http, private tokenService: Angular2TokenService) {
    console.log('PostCodeApi Provider Created');
  }

  getPostCodes(searchTerm) {
    let endpoint = `${this.base_url}.json?search=${searchTerm}`;
    return this.tokenService.get(endpoint).map(response=>{
      this.post_codes = response.json();
      return this.post_codes;
    })
  }

  getPostCodeDetails(post_code_id) {
    return this.tokenService.get(`${this.base_url}/${post_code_id}.json`).map(response=>{
      this.post_code = response.json();
      return this.post_code;
    })
  }


}
