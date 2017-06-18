import { Injectable} from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserPic } from '../user-pic/user-pic';
import { UserDoc } from '../user-doc/user-doc';

import * as _ from 'lodash';

export class DocLinks {
    constructor(public navCtrl: NavController) {
    console.log('Hello DocLinksProvider Provider');
  }

  pendingDocs(user) {
    let required = ["Profile Pic", "ID Card", "Qualifying Certificate", "Address Proof", "DBS"]
    let pending = _.dropWhile(required, (required_type) => {
      let found = _.find(user.user_docs, function (doc) { return doc.doc_type == required_type; });
      return found != null;
    });
    return _.map(pending, (doc_type) => { return { name: "Not Uploaded", doc_type: doc_type } });
  }

  uploadNow(doc) {
    this.navCtrl.push(UserPic, doc);
  }

  viewDoc(doc) {
    this.navCtrl.push(UserDoc, doc);
  }

  getDocColorAndText(doc) {
    switch (doc.verified) {
      case true: {
        return ["secondary", "Verified"];
      }
      case false: {
        return ["danger", "Rejected"];
      }
      default: {
        return ["primary", "Pending Verification"];
      }
    }
  }
}