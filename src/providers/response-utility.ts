import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ResponseUtility provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ResponseUtility {

  constructor(public http: Http,
    public alertController: AlertController,
    public toastController: ToastController) {
    console.log('ResponseUtility Provider Created');
  }

  showSuccess(msg) {
    let toast = this.toastController.create({
      message: msg,
      duration: 4000, cssClass: "toast-success",
      position: 'bottom'
    });
    toast.present();
    console.log(msg)
  }

  showWarning(msg) {
    let toast = this.toastController.create({
      message: msg,
      duration: 4000, cssClass: "toast-warning",
      position: 'bottom'
    });
    toast.present();
    console.log(msg)
  }

  showFailure(error, msg=null) {

    if(!msg) {
      msg = 'The operations you were trying failed. Please contact the administrator. ';
    }
    
    let confirm = this.alertController.create({
      title: 'Error',
      cssClass: 'error-alert',
      message: msg + ` </br> ${error}`,
      buttons: [
        { text: 'OK' }
      ]
    });
    confirm.present();
    console.log(msg)
  }

  confirmDelete(deleteEntityFn, entity) {
    let confirm = this.alertController.create({
      title: 'Delete',
      cssClass: 'delete-alert',
      message: 'Are you sure you want to delete ?',
      buttons: [
        {
          text: 'Yes',
          handler: () => { deleteEntityFn(entity); }          
        },
        { text: 'No' }
      ]
    });
    confirm.present();
  }
}
