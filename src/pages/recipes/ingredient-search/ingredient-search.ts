import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the IngredientSearch page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ingredient-search',
  templateUrl: 'ingredient-search.html'
})
export class IngredientSearch {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello IngredientSearch Page');
  }

}
