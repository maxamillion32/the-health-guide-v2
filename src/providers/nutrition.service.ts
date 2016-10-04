import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Food, Nutrient } from "../models";

@Injectable()
export class NutritionService {
  private food: FirebaseListObservable<Food[]>;
  private macronutrients: FirebaseListObservable<Nutrient[]>;
  private micronutrients: FirebaseListObservable<Nutrient[]>;

  constructor(af: AngularFire) {
    this.food = af.database.list('/food', {
      query: {
        orderByChild: 'name'
      }
    });
    this.micronutrients = af.database.list('/micronutrients', {
      query: {
        orderByChild: 'name'
      }
    });
    this.macronutrients = af.database.list('/macronutrients', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  public getFood(): FirebaseListObservable<Food[]> {
    return this.food;
  }

  public getMacronutrients(): FirebaseListObservable<Nutrient[]> {
    return this.macronutrients;
  }

  public getMicronutrients(): FirebaseListObservable<Nutrient[]> {
    return this.micronutrients;
  }

}
