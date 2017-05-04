import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraPreview } from '@ionic-native/camera-preview';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';

import { Angular2TokenService } from 'angular2-token';

import { UserPic } from '../pages/user-pic/user-pic';
import { Users } from '../pages/users/users';
import { UserForm } from '../pages/users/user-form';
import { UserDetails } from '../pages/users/user-details';
import { UserVerification } from '../pages/user-verification/user-verification';


import { StaffingRequest } from '../pages/staffing-request/staffing-request';
import { StaffingRequestForm } from '../pages/staffing-request/staffing-request-form';
import { StaffingRequestDetails } from '../pages/staffing-request/staffing-request-details';

import { StaffingResponse } from '../pages/staffing-response/staffing-response';
import { StaffingResponseDetails } from '../pages/staffing-response/staffing-response-details';
import { StaffingResponseForm } from '../pages/staffing-response/staffing-response-form';

import { Payment } from '../pages/payment/payment';
import { PaymentDetails } from '../pages/payment/payment-details';
import { PaymentForm } from '../pages/payment/payment-form';


import { Hospitals } from '../pages/hospitals/hospitals';
import { HospitalForm } from '../pages/hospitals/hospital-form';
import { HospitalDetails } from '../pages/hospitals/hospital-details';

import { Diagnostic } from '@ionic-native/diagnostic';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import {MomentModule} from 'angular2-moment';
import {UserApi} from '../providers/user-api'
import {HospitalApi} from '../providers/hospital-api'
import {PaymentApi} from '../providers/payment-api'
import {StaffingRequestApi} from '../providers/staffing-request-api'
import {StaffingResponseApi} from '../providers/staffing-response-api'

import {ResponseUtility} from '../providers/response-utility'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    UserPic,
    Users,    
    UserForm,
    UserDetails,
    UserVerification,
    StaffingResponse,
    StaffingResponseForm,
    StaffingResponseDetails,
    Payment,
    PaymentForm,
    PaymentDetails,    
    StaffingRequest,
    StaffingRequestForm,
    StaffingRequestDetails,
    Hospitals,
    HospitalForm,
    HospitalDetails
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    MomentModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    UserPic,
    Users,
    UserForm,
    UserDetails,
    UserVerification,
    StaffingResponse,
    StaffingResponseForm,
    StaffingResponseDetails,
    Payment,
    PaymentForm,
    PaymentDetails,        
    StaffingRequest,
    StaffingRequestForm,
    StaffingRequestDetails,
    Hospitals,
    HospitalForm,
    HospitalDetails
  ],
  providers: [
    UserApi,
    HospitalApi,
    StaffingRequestApi,
    StaffingResponseApi,
    PaymentApi,
    ResponseUtility,
    StatusBar,
    SplashScreen,
    Angular2TokenService,
    Camera,
    CameraPreview,
    Diagnostic,
    File,
    FilePath,
    Transfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

