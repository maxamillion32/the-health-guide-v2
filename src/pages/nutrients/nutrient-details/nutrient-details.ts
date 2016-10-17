import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Nutrient } from '../../../models';

@Component({
  templateUrl: 'nutrient-details.html'
})
export class NutrientDetailsPage implements OnInit {
  public nutrient: Nutrient;
  public intakeUnit: string;
  public nutrientDetails: string = "summary";

  constructor(private params: NavParams) {}

  ngOnInit(): void {
    this.nutrient = this.params.data.nutrient;
    this.intakeUnit = (this.nutrient.category === 'Vitamin' || this.nutrient.category === 'Mineral') ? 'mg' : 'g';
  }

}
