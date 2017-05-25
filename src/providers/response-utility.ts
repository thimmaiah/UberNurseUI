import { Injectable } from '@angular/core';
import { AlertController, ToastController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class ResponseUtility {

  constructor(public http: Http,
    public alertController: AlertController,
    public modalController:ModalController,
    public toastController: ToastController) {
    console.log('ResponseUtility Provider Created');
  }

  showMsg(msg) {
    let toast = this.toastController.create({
      message: msg,
      duration: 4000, 
      position: 'bottom'
    });
    toast.present();
    console.log(msg)
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
      message: 'Are you sure you want to proceed ?',
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

  confirmAction(actionFn, entity, msg) {
    let confirm = this.alertController.create({
      title: "Confirm",
      message: msg,
      buttons: [
        {
          text: 'Yes',
          handler: () => { actionFn(entity); }          
        },
        { text: 'No' }
      ]
    });
    confirm.present();
  }

  popup(title, msg) {
    let confirm = this.alertController.create({
      title: title,
      message: msg,
      buttons: [
        { text: 'Ok' }
      ]
    });
    confirm.present();
  }
}
