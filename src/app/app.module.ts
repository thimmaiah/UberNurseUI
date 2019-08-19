import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Keyboard } from '@ionic-native/keyboard';
import { CalendarModule } from "ion2-calendar";

import { SentryErrorHandler } from '../services/sentry-errorhandler'
import { CodePush } from '@ionic-native/code-push';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AdminMenus } from '../pages/home/admin-menus';
import { TempMenus } from '../pages/home/temp-menus';
import { Login } from '../pages/login/login';
import { PasswordReset } from '../pages/login/password-reset'

import { IonicStorageModule } from '@ionic/storage';
import { AngularTokenService, AngularTokenModule } from 'angular-token';
// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';
import {EmailVerificationPage} from '../pages/users/email-verification';

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
import { QrCode } from '../pages/care-homes/qr_code';
import { CareHomeSearch } from '../pages/care-homes/care-home-search';
import { CareHomeForm } from '../pages/care-homes/care-home-form';
import { CareHomeDetails } from '../pages/care-homes/care-home-details';
import { CareHomeBankingDetails } from '../pages/care-homes/care-home-banking-details';

import { Diagnostic } from '@ionic-native/diagnostic';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule, Http } from '@angular/http';
import { MomentModule } from 'ngx-moment';
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

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpClientModule } from '@angular/common/http';
import { Agency } from '../pages/agency/agency';
import { AgencyForm } from '../pages/agency/agency-form';
import { AgencyDetails } from '../pages/agency/agency-details';
import { AgencyApi } from '../providers/agency-api';
import { AgencyUserMappingApi } from '../providers/agency-user-mapping-api';
import { AgencyCareHomeMappingApi } from '../providers/agency-care-home-mapping-api';
import { ShiftReject } from '../pages/shift/shift-reject';
import { RecurringRequestApi } from '../providers/recurring-request-api';
import { CommonModule } from '@angular/common';
import { PaymentSearch } from '../pages/payment/payment-search';
import { RecurringRequestForm } from '../pages/staffing-request/recurring-request-form';
import { RecurringRequest } from '../pages/staffing-request/recurring-request';
import { RecurringRequestDetails } from '../pages/staffing-request/recurring-request-details';
import { CookiesPage } from '../pages/static/cookies';

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
    EmailVerificationPage,
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
    ShiftReject,
    Payment,
    PaymentForm,
    PaymentDetails,
    PaymentSearch,
    StaffingRequest,
    StaffingRequestForm,
    RecurringRequestForm,
    RecurringRequest,
    RecurringRequestDetails,
    StaffingRequestDetails,
    Agency,
    AgencyForm,
    AgencyDetails,
    CareHomes,
    CareHomeForm,
    CareHomeDetails,
    CareHomeSearch,
    CareHomeBankingDetails,
    QrCode,
    TitleCasePipe,
    UtcDatePipe,
    AboutPage,
    HelpPage,
    CookiesPage,
    ContactPage,
    TermsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    CalendarModule,
    MomentModule,
    CommonModule,
    Ionic2RatingModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularTokenModule.forRoot({
      updatePasswordPath: "/auth/password"
    })
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
    EmailVerificationPage,
    BankingDetailsPage,
    RegisterPage,
    Rating,
    RatingForm,
    RatingDetails,
    Shift,
    ShiftForm,
    ShiftDetails,
    ShiftReject,
    ReferralPage,
    ReferralDetails,
    ReferralForm,
    Payment,
    PaymentForm,
    PaymentDetails,
    StaffingRequest,
    StaffingRequestForm,
    RecurringRequestForm,
    RecurringRequest,
    RecurringRequestDetails,
    StaffingRequestDetails,
    Agency,
    AgencyForm,
    AgencyDetails,
    CareHomes,
    CareHomeForm,
    CareHomeDetails,
    CareHomeSearch,
    CareHomeBankingDetails,
    QrCode,
    AboutPage,
    CookiesPage,
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
    AgencyApi,
    AgencyUserMappingApi,
    AgencyCareHomeMappingApi,
    CareHomeApi,
    CqcRecordApi,
    PostCodeApi,
    StaffingRequestApi,
    RecurringRequestApi,
    ShiftApi,
    PaymentApi,
    ResponseUtility,
    StatusBar,
    SplashScreen,
    Keyboard,
    AngularTokenModule,
    Camera,
    Diagnostic,
    File,
    FilePath,
    FileTransfer,
    HomeEvents,
    ReferralApi,
    BarcodeScanner, 
    { provide: ErrorHandler, useClass: SentryErrorHandler }
  ]
})
export class AppModule { }

