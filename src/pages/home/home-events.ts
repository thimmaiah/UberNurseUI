import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';
import { ResponseUtility } from '../../providers/response-utility';
import { Config } from '../../providers/config';
import { Events } from 'ionic-angular';

export class HomeEvents {

    currentUser: any;

    constructor(public navCtrl: NavController,
        public respUtility: ResponseUtility,
        public tokenService: Angular2TokenService,
        public config: Config,
        public events: Events) {

        // When the user logout succeeds
        events.subscribe('user:logout:success', () => {
            console.log("HomePage: user:logout:success");
            this.currentUser = null;
        });
        // When the user login succeeds
        this.events.subscribe('user:login:success', () => {
            console.log("AdminMenus: user:login:success");
            this.currentUser = this.tokenService.currentUserData;
            this.displayMsgs();
        });
        this.events.subscribe('current_user:reload', () => {
            console.log("AdminMenus: current_user:reload");
            this.tokenService.validateToken().subscribe(
                resp => {
                    console.log(resp);
                    let body = JSON.parse(resp["_body"]);
                    this.currentUser = body["data"];
                },
                err => { console.log(err) }
            );
            this.displayMsgs();
        });

    }

    displayMsgs() {

    }

}