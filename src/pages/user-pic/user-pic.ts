import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, ActionSheetController, ToastController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Diagnostic } from '@ionic-native/diagnostic';
import { ResponseUtility } from '../../providers/response-utility';
import { Config } from '../../providers/config';
import { Angular2TokenService } from 'angular2-token';


declare var cordova: any;

@Component({
  selector: 'page-user-pic',
  templateUrl: 'user-pic.html',
})
export class UserPic {

  lastImage: string = null;
  base64Image = null;
  current_user = null;

  cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'rear',
    tapPhoto: true,
    previewDrag: true,
    toBack: true,
    alpha: 1
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public respUtility: ResponseUtility,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    private cameraPreview: CameraPreview,
    private diagnostic: Diagnostic,
    private camera: Camera,
    private filePath: FilePath,
    private file: File,
    private transfer: Transfer,
    private config: Config,
    private tokenService: Angular2TokenService) {

      this.current_user = tokenService.currentUserData;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPic');
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog

    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.NATIVE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      console.log("imagePath = " + imagePath);
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {

            this.lastImage = "file://" + imagePath;
        
      } else {
        let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        console.log(correctPath);
        console.log(currentName);

        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      console.log(err);
      this.presentToast('Error while selecting image.');
    });
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    console.log("newFileName = " + newFileName);
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      console.log("lastImage = " + this.lastImage);

    }, error => {
      console.log(error);
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }


  public uploadImage() {
    // Destination URL
    let url = "http://192.168.0.4:3000/user_docs";

    // File for Upload
    let targetPath = this.lastImage;

    // File name only
    let filename = this.lastImage.substr(this.lastImage.lastIndexOf('/') + 1);
        
    let authData = this.tokenService.currentAuthData;

    var options = {
      fileKey: "user_doc[doc]",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'user_doc[name]': filename, 
                "user_doc[doc_type]": "Id Card",
                // Need the auth headers as user_docs is a protected API
                "headers": {
                  "access-token": authData.accessToken,
                  "client" : authData.client,
                  "token-type" : authData.tokenType,
                  "uid" : authData.uid,
                  "expiry" : authData.expiry
                } 
            }
    };

    let fileTransfer = this.transfer.create();

    let loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
    }, err => {
      loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }
}
