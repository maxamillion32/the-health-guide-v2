import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the RecipeEdit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recipe-edit',
  templateUrl: 'recipe-edit.html'
})
export class RecipeEdit {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello RecipeEdit Page');
  }

}
