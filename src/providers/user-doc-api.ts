import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';


@Injectable()
export class UserDocApi {

  private base_url = "user_docs";
  private remoteEndpoint;
  user_docs = [];
  user_doc = {};

  constructor(private tokenService: Angular2TokenService) {
    console.log('UserDocApi Provider Created');
  }

  getUserDocs() {
    
    return this.tokenService.get(`${this.base_url}.json`).map(response=>{
      this.user_docs = response.json();
      return this.user_docs;      
    })
  }

  getUserDocDetails(user_doc_id) {
    return this.tokenService.get(`${this.base_url}/${user_doc_id}.json`).map(response=>{
      this.user_doc = response.json();
      return this.user_doc;
    })
  }

  createUserDoc(user_doc) {
    return this.tokenService.post(`${this.base_url}.json`, user_doc).map(response=>{
      this.user_doc = response.json();
      return this.user_doc;
    })
  }

  updateUserDoc(user_doc) {
    console.log(`UserDocApi: Updating user_doc`)
    console.log(user_doc);
    return this.tokenService.put(`${this.base_url}/${user_doc.id}.json`, user_doc).map(response=>{
      this.user_doc = response.json();
      return this.user_doc;
    })
  }

  deleteUserDoc(user_doc) {
    return this.tokenService.delete(`${this.base_url}/${user_doc.id}.json`).map(response=>{
      return response.status;
    })
  }

}
