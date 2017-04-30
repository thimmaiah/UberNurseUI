import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';

import { Angular2TokenService } from 'angular2-token';

import { Users } from '../pages/users/users';
import { UserForm } from '../pages/users/user-form';
import { UserDetails } from '../pages/users/user-details';

import { StaffingRequest } from '../pages/staffing-request/staffing-request';
import { StaffingRequestForm } from '../pages/staffing-request/staffing-request-form';
import { StaffingRequestDetails } from '../pages/staffing-request/staffing-request-details';

import { StaffingResponse } from '../pages/staffing-response/staffing-response';
import { StaffingResponseDetails } from '../pages/staffing-response/staffing-response-details';
import { StaffingResponseForm } from '../pages/staffing-response/staffing-response-form';

import { Hospitals } from '../pages/hospitals/hospitals';
import { HospitalForm } from '../pages/hospitals/hospital-form';
import { HospitalDetails } from '../pages/hospitals/hospital-details';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import {UserApi} from '../providers/user-api'
import {HospitalApi} from '../providers/hospital-api'
import {StaffingRequestApi} from '../providers/staffing-request-api'
import {StaffingResponseApi} from '../providers/staffing-response-api'

import {ResponseUtility} from '../providers/response-utility'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    Users,    
    UserForm,
    UserDetails,
    StaffingResponse,
    StaffingResponseForm,
    StaffingResponseDetails,
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
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    Users,
    UserForm,
    UserDetails,
    StaffingResponse,
    StaffingResponseForm,
    StaffingResponseDetails,
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
    ResponseUtility,
    StatusBar,
    SplashScreen,
    Angular2TokenService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

