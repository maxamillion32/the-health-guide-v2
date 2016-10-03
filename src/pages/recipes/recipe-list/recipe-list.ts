import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'recipe-list.html'
})
export class RecipeList {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Recipes Page');
  }

}
