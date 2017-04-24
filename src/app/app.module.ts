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

import { Hospitals } from '../pages/hospitals/hospitals';
import { HospitalForm } from '../pages/hospitals/hospital-form';
import { HospitalDetails } from '../pages/hospitals/hospital-details';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import {UserApi} from '../providers/user-api'
import {HospitalApi} from '../providers/hospital-api'

import {TokenService} from '../providers/token-service'
import {ResponseUtility} from '../providers/response-utility'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    Users,    
    UserForm,
    UserDetails,
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
    Hospitals,
    HospitalForm,
    HospitalDetails
  ],
  providers: [
    UserApi,
    HospitalApi,
    TokenService,
    ResponseUtility,
    StatusBar,
    SplashScreen,
    Angular2TokenService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
