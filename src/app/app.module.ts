import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Keyboard } from '@ionic-native/keyboard';

import { SentryErrorHandler } from '../services/sentry-errorhandler'
import { CodePush } from '@ionic-native/code-push';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AdminMenus } from '../pages/home/admin-menus';
import { TempMenus } from '../pages/home/temp-menus';
import { Login } from '../pages/login/login';
import { PasswordReset } from '../pages/login/password-reset'

import { IonicStorageModule } from '@ionic/storage';
import { Angular2TokenService } from 'angular2-token';
// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';

import { UserPic } from '../pages/user-pic/user-pic';
import { UserDoc } from '../pages/user-doc/user-doc';
import { Users } from '../pages/users/users';
import { UserTabs } from '../pages/users/user-tabs';
import { UserForm } from '../pages/users/user-form';
import { UserDetails } from '../pages/users/user-details';
import { PhoneVerificationPage } from '../pages/users/phone-verification';
import { BankingDetailsPage } from '../pages/users/banking-details';
import { RegisterPage } from '../pages/users/register';

import { StaffingRequest } from '../pages/staffing-request/staffing-request';
import { StaffingRequestForm } from '../pages/staffing-request/staffing-request-form';
import { StaffingRequestDetails } from '../pages/staffing-request/staffing-request-details';

import { AboutPage } from '../pages/static/about';
import { HelpPage } from '../pages/static/help';
import { TermsPage } from '../pages/static/terms';
import { ContactPage } from '../pages/static/contact';

import { Shift } from '../pages/shift/shift';
import { ShiftDetails } from '../pages/shift/shift-details';
import { ShiftForm } from '../pages/shift/shift-form';

import { Payment } from '../pages/payment/payment';
import { PaymentDetails } from '../pages/payment/payment-details';
import { PaymentForm } from '../pages/payment/payment-form';

import { ReferralPage } from '../pages/referral/referral';
import { ReferralDetails } from '../pages/referral/referral-details';
import { ReferralForm } from '../pages/referral/referral-form';


import { Rating } from '../pages/rating/rating';
import { RatingDetails } from '../pages/rating/rating-details';
import { RatingForm } from '../pages/rating/rating-form';



import { CareHomes } from '../pages/care-homes/care-homes';
import { CareHomeSearch } from '../pages/care-homes/care-home-search';
import { CareHomeForm } from '../pages/care-homes/care-home-form';
import { CareHomeDetails } from '../pages/care-homes/care-home-details';
import { CareHomeBankingDetails } from '../pages/care-homes/care-home-banking-details';

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
import { ShiftApi } from '../providers/shift-api'
import { ReferralApi } from '../providers/referral-api'

import { ResponseUtility } from '../providers/response-utility'
import { Push } from '@ionic-native/push';
import { TitleCasePipe } from '../pipes/title-case/title-case';
import { UtcDatePipe } from '../pipes/utc-date/utc-date';
import { LoginProvider } from '../providers/login-provider';
import { PostCodeApi } from '../providers/postcode-api';
import { HomeEvents } from '../providers/home-events';
import { GoogleAnalytics } from '@ionic-native/google-analytics';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AdminMenus,
    TempMenus,
    Login,
    PasswordReset,
    UserPic,
    UserDoc,
    Users,
    UserTabs,
    UserForm,
    UserDetails,
    PhoneVerificationPage,
    BankingDetailsPage,
    RegisterPage,
    Rating,
    RatingForm,
    RatingDetails,
    ReferralPage,
    ReferralDetails,
    ReferralForm,
    Shift,
    ShiftForm,
    ShiftDetails,
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
    CareHomeBankingDetails,
    TitleCasePipe,
    UtcDatePipe,
    AboutPage,
    HelpPage,
    ContactPage,
    TermsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    MomentModule,
    Ionic2RatingModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AdminMenus,
    TempMenus,
    Login,
    PasswordReset,
    UserPic,
    UserDoc,
    Users,
    UserTabs,
    UserForm,
    UserDetails,
    PhoneVerificationPage,
    BankingDetailsPage,
    RegisterPage,
    Rating,
    RatingForm,
    RatingDetails,
    Shift,
    ShiftForm,
    ShiftDetails,
    ReferralPage,
    ReferralDetails,
    ReferralForm,
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
    CareHomeBankingDetails,
    AboutPage,
    HelpPage,
    ContactPage,
    TermsPage
  ],

  providers: [
    Push,
    CodePush,
    GoogleAnalytics,
    Config,
    LoginProvider,
    UserApi,
    UserDocApi,
    RatingApi,
    CareHomeApi,
    CqcRecordApi,
    PostCodeApi,
    StaffingRequestApi,
    ShiftApi,
    PaymentApi,
    ResponseUtility,
    StatusBar,
    SplashScreen,
    Keyboard,
    Angular2TokenService,
    Camera,
    Diagnostic,
    File,
    FilePath,
    Transfer,
    HomeEvents,
    ReferralApi,
    { provide: ErrorHandler, useClass: SentryErrorHandler }
  ]
})
export class AppModule { }

