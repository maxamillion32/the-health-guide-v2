import { Component, OnInit } from '@angular/core';
import { AngularFire } from "angularfire2";

import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'home.html'
})
export class Home implements OnInit {
  constructor(private navCtrl: NavController, public af: AngularFire) { }

  ngOnInit(): void {
    this.af.auth.subscribe(auth => console.log(auth.auth.providerData[0]));
  }
}
