import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, ActionSheetController, ToastController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
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
  user_doc : {};


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public respUtility: ResponseUtility,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    private diagnostic: Diagnostic,
    private camera: Camera,
    private filePath: FilePath,
    private file: File,
    private transfer: Transfer,
    private config: Config,
    private tokenService: Angular2TokenService) {

      this.current_user = tokenService.currentUserData;
      this.user_doc = this.navParams.data;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPic');
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog

    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
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
     	//let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        //let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        //console.log(correctPath);
        //console.log(currentName);
        this.lastImage = imagePath;

        //this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      console.log(err);
      this.respUtility.showWarning('Error while selecting image.');
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
      this.respUtility.showWarning('Error while storing file.');
    });
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
    let api_url = this.config.props["API_URL"]
    let url = `${api_url}/user_docs`;

    // File for Upload
    let targetPath = this.lastImage;

    // File name only
    this.user_doc["name"] = this.lastImage.substr(this.lastImage.lastIndexOf('/') + 1);
        
    let authData = this.tokenService.currentAuthData;

    var options = {
      fileKey: "user_doc[doc]",
      fileName: this.user_doc["name"],
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'user_doc[name]': this.user_doc["name"], 
                "user_doc[doc_type]": this.user_doc["doc_type"],
                "user_doc[user_id]": this.current_user.id,                
                "user_doc[id]": this.user_doc["id"],
                // // Need the auth headers as user_docs is a protected API
                // "headers": {
                //   "access-token": authData.accessToken,
                //   "client" : authData.client,
                //   "token-type" : authData.tokenType,
                //   "uid" : authData.uid,
                //   "expiry" : authData.expiry
                // } 
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
      this.respUtility.showSuccess('Image succesful uploaded.');
      console.log(data);
      // Update the tokenService.currentAuthData
      
      this.navCtrl.pop();
    }, err => {
      loading.dismissAll()
      console.log(err);
      this.respUtility.showWarning('Error while uploading file.');
    });
  }
}
