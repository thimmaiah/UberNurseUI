import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';

import { Angular2TokenService } from 'angular2-token';
// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';

import { UserPic } from '../pages/user-pic/user-pic';
import { UserDoc } from '../pages/user-doc/user-doc';
import { Users } from '../pages/users/users';
import { UserForm } from '../pages/users/user-form';
import { UserDetails } from '../pages/users/user-details';

import { StaffingRequest } from '../pages/staffing-request/staffing-request';
import { StaffingRequestForm } from '../pages/staffing-request/staffing-request-form';
import { StaffingRequestDetails } from '../pages/staffing-request/staffing-request-details';

import { StaffingResponse } from '../pages/staffing-response/staffing-response';
import { StaffingResponseDetails } from '../pages/staffing-response/staffing-response-details';
import { StaffingResponseForm } from '../pages/staffing-response/staffing-response-form';

import { Payment } from '../pages/payment/payment';
import { PaymentDetails } from '../pages/payment/payment-details';
import { PaymentForm } from '../pages/payment/payment-form';

import { Rating } from '../pages/rating/rating';
import { RatingDetails } from '../pages/rating/rating-details';
import { RatingForm } from '../pages/rating/rating-form';



import { CareHomes } from '../pages/care-homes/care-homes';
import { CareHomeSearch } from '../pages/care-homes/care-home-search';
import { CareHomeForm } from '../pages/care-homes/care-home-form';
import { CareHomeDetails } from '../pages/care-homes/care-home-details';

import { Diagnostic } from '@ionic-native/diagnostic';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';
import { UserApi } from '../providers/user-api'
import { UserDocApi } from '../providers/user-doc-api'
import { Config } from '../providers/config'
import { CareHomeApi } from '../providers/care-home-api'
import { CqcRecordApi } from '../providers/cqc-record-api'
import { PaymentApi } from '../providers/payment-api'
import { RatingApi } from '../providers/rating-api'
import { StaffingRequestApi } from '../providers/staffing-request-api'
import { StaffingResponseApi } from '../providers/staffing-response-api'

import { ResponseUtility } from '../providers/response-utility'
import { Push } from '@ionic-native/push';
import { TitleCasePipe } from '../pipes/title-case/title-case';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    UserPic,
    UserDoc,
    Users,
    UserForm,
    UserDetails,
    Rating,
    RatingForm,
    RatingDetails,
    StaffingResponse,
    StaffingResponseForm,
    StaffingResponseDetails,
    Payment,
    PaymentForm,
    PaymentDetails,
    StaffingRequest,
    StaffingRequestForm,
    StaffingRequestDetails,
    CareHomes,
    CareHomeForm,
    CareHomeDetails,
    CareHomeSearch,
    TitleCasePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    MomentModule,
    Ionic2RatingModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    UserPic,
    UserDoc,
    Users,
    UserForm,
    UserDetails,
    Rating,
    RatingForm,
    RatingDetails,
    StaffingResponse,
    StaffingResponseForm,
    StaffingResponseDetails,
    Payment,
    PaymentForm,
    PaymentDetails,
    StaffingRequest,
    StaffingRequestForm,
    StaffingRequestDetails,
    CareHomes,
    CareHomeForm,
    CareHomeDetails,
    CareHomeSearch
  ],
  providers: [
    Push,
    Config,
    UserApi,
    UserDocApi,
    RatingApi,
    CareHomeApi,
    CqcRecordApi,
    StaffingRequestApi,
    StaffingResponseApi,
    PaymentApi,
    ResponseUtility,
    StatusBar,
    SplashScreen,
    Angular2TokenService,
    Camera,
    Diagnostic,
    File,
    FilePath,
    Transfer,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

