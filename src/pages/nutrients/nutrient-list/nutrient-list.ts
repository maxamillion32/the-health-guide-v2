import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
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
  public searchBy: string = "name";
  public searchQuery: string = "";

  constructor(private alertCtrl: AlertController, private navCtrl: NavController, private nutritionSvc: NutritionService) { }

  public openNutrientDetails(nutrient: Nutrient): void {
    this.navCtrl.push(NutrientDetails, { nutrient });
  }

  public resetSearch(): void {
    this.searchQuery = "";
  }

  public setFilterOpts(): void {
    let filterAlert = this.alertCtrl.create({
      title: "Nutrient search filter",
      inputs: [
        {
          type: 'radio',
          label: 'Name',
          value: 'name',
          checked: true
        }, {
          type: 'radio',
          label: 'Description',
          value: 'description'
        }, {
          type: 'radio',
          label: 'Functions',
          value: 'functions'
        }, {
          type: 'radio',
          label: 'Disease preventions',
          value: 'diseasePrev'
        }, {
          type: 'radio',
          label: 'Deficiency',
          value: 'deficiency'
        }, {
          type: 'radio',
          label: 'Toxicity',
          value: 'toxicity'
        }, {
          type: 'radio',
          label: 'Relationship with other nutrients',
          value: 'nutrientRelationship'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        }, {
          text: 'OK',
          handler: data => {
            this.searchBy = data;
            console.log(data)
          }
        }
      ]
    });
    filterAlert.present();
  }

  ngOnInit(): void {
    this.micronutrients = this.nutritionSvc.getMicronutrients();
    this.macronutrients = this.nutritionSvc.getMacronutrients();
  }

}
