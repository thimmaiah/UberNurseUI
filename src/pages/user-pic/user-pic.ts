import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, ActionSheetController, ToastController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Diagnostic } from '@ionic-native/diagnostic';



declare var cordova: any;

@Component({
  selector: 'page-user-pic',
  templateUrl: 'user-pic.html',
})
export class UserPic {

  lastImage: string = null;
  base64Image = null;

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
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    private cameraPreview: CameraPreview,
    private diagnostic: Diagnostic,
    private camera: Camera,
    private filePath: FilePath,
    private file: File,
    private transfer: Transfer) {

  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPic');
  }


  takePic() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  checkPermissions() {
    this.diagnostic.isCameraAuthorized().then((authorized) => {
      if (authorized) {
        console.log('starting Camera');
        this.previewPic();
      }
      else {
        this.diagnostic.requestCameraAuthorization().then((status) => {
          if (status == this.diagnostic.permissionStatus.GRANTED)
            this.previewPic();
          else {
            // Permissions not granted
            // Therefore, create and present toast
            this.toastCtrl.create(
              {
                message: "Cannot access camera",
                position: "bottom",
                duration: 5000
              }
            ).present();
          }
        });
      }
    });
  }
  previewPic() {
    var cameraPreviewOpts: CameraPreviewOptions = {
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

    var that = this;

    let options = {
      x: 0,
      y: 0,
      width: 120,
      height: 120,
      camera: "back",
      toBack: false,
      tapPhoto: false,
      previewDrag: false
    };
    console.log("camera: " + options.camera);
    this.cameraPreview.startCamera(cameraPreviewOpts).then(() => {
      console.log("startCamera");
      that.toastCtrl.create(
        {
          message: "Starting Camera: OK",
          position: "bottom",
          duration: 5000
        }
      ).present();
    }, function (error) {
      console.log('error', error);
    });


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
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);

            let currentNameBuilder = imagePath.substr(imagePath.lastIndexOf('/') + 1);

            let currentName = currentNameBuilder.substr(0, currentNameBuilder.lastIndexOf('?')); console.log(correctPath);
            console.log(currentName);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
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
            //this.takePicture(this.camera.PictureSourceType.CAMERA);
            //this.takePic();
            this.checkPermissions();
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
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
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
    var url = "http://localhost:3000/user_docs";

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename }
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
