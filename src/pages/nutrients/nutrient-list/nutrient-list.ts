import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';

// Models
import { Nutrient } from "../../../models";

// Pages
import { NutrientDetails } from "../nutrient-details/nutrient-details";

// Providers
import { NutritionService } from "../../../providers"

@Component({
  templateUrl: 'nutrient-list.html'
})
export class NutrientList implements OnInit {
  public micronutrients: FirebaseListObservable<Nutrient[]>;
  public macronutrients: FirebaseListObservable<Nutrient[]>;
  public nutrientGroup: string = "macronutrients";
  public searchQuery: string = "";

  constructor(private navCtrl: NavController, private nutritionSvc: NutritionService) { }

  public openNutrientDetails(nutrient: Nutrient): void {
    this.navCtrl.push(NutrientDetails, { nutrient });
  }

  ngOnInit(): void {
    this.micronutrients = this.nutritionSvc.getMicronutrients();
    this.macronutrients = this.nutritionSvc.getMacronutrients();
  }

}
