import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Models
import { Recipe } from '../../../models';

@Component({
  selector: 'page-recipe-details',
  templateUrl: 'recipe-details.html'
})
export class RecipeDetailsPage implements OnInit {
  public recipe: Recipe;

  constructor(private navCtrl: NavController, private params: NavParams) {}

  ngOnInit(): void {
    this.recipe = this.params.get("recipe");
  }

}
