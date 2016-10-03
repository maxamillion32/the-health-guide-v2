import { Component, OnInit } from '@angular/core';
import { Alert, NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';

// Models
import { Nutrient } from "../../../models/nutrient.model";

// Pipes

// Providers
import { NutritionService } from "../../../providers/nutrition.service"

@Component({
  templateUrl: 'nutrient-list.html'
})
export class NutrientList implements OnInit {
  public micronutrients: FirebaseListObservable<Nutrient[]>;
  public macronutrients: FirebaseListObservable<Nutrient[]>;
  public nutrientGroup: string = "macronutrients";

  constructor(private navCtrl: NavController, private nutritionSvc: NutritionService) { }

  ngOnInit(): void {
    this.micronutrients = this.nutritionSvc.getMicronutrients();
    this.macronutrients = this.nutritionSvc.getMacronutrients();
  }

}
