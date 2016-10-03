import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'fitness.html'
})
export class Fitness {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Fitness Page');
  }

}
