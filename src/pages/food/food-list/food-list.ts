import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'food-list.html'
})
export class FoodListPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Food Page');
  }

}
