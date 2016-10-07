import { Component, OnInit } from '@angular/core';
import { AngularFire } from "angularfire2";

import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'home.html'
})
export class Home implements OnInit {
  constructor(private navCtrl: NavController, public af: AngularFire) { }

  ngOnInit(): void {
    console.log("Welcome home");
  }
}
