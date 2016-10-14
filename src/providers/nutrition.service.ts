import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Bio, Food, Nutrient, Nutrition } from "../models";

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

  private setAgeLabel(usrBio: Bio): string {
    let ageLabel: string = '';
    if (usrBio.infancy === 'yes') {
      ageLabel = (usrBio.age <= 6) ? "0-6 months" : "7-12 months";
    } else {
      ageLabel = (usrBio.age <= 3) ? "1-3 years" :
        (usrBio.age <= 8) ? "4-8 years" :
          (usrBio.age <= 13) ? "9-13 years" :
            (usrBio.age <= 18) ? "14-18 years" :
              (usrBio.age <= 50) ? "19-50 years" :
                (usrBio.age <= 70) ? "50-70 years" : "70+ years";
    }
    return ageLabel;
  };

  private setMacronutrientIntake(nutrient: Nutrient, usrBio: Bio, requirements: Nutrition): Nutrition {
    let nutrientName = nutrient.name.toLowerCase(), ageLabel: string = this.setAgeLabel(usrBio);
    if (requirements.macronutrients.hasOwnProperty(nutrient.name)) {
      // The macronutrient matches to the one we have in the macronutrients group
      requirements.macronutrients[nutrient.name] = (usrBio.gender === 'female')
        ? nutrient.intake[usrBio.gender][usrBio.pregnancyStage][ageLabel]
        : nutrient.intake[usrBio.gender][ageLabel];
    }
    if (nutrient.hasOwnProperty('classification')) {
      // Check if the macronutrient has subgroups that we have in the macronutrients
      // (e.g. "Monounsaturated fat" is a subgroup of "Fats")
      nutrient.classification.forEach(nutrientType => {
        if (nutrientType.hasOwnProperty('intake')) {
          // Check if it has recommended intake
          if (requirements.macronutrients.hasOwnProperty(nutrientType.name)) {
            requirements.macronutrients[nutrientType.name] = (usrBio.gender === 'female')
              ? nutrientType.intake[usrBio.gender][usrBio.pregnancyStage][ageLabel]
              : nutrientType.intake[usrBio.gender][ageLabel];
          }
        }
      });
    }
    return requirements;
  }

  private setMacronutrientSubIntake(nutrient: Nutrient, usrBio: Bio, requirements: Nutrition): Nutrition {
    let nutrientName = nutrient.name.toLowerCase(), ageLabel: string = this.setAgeLabel(usrBio);
    nutrient.classification.forEach(nutrientType => {
      if (nutrientType.hasOwnProperty('intake')) {
        // Check if it has recommended intake and if
        // the current nutrient group matches to one we have
        let normalIntake = nutrientType.intake[usrBio.gender][ageLabel],
          pregnancyIntake = nutrientType.intake[usrBio.gender][usrBio.pregnancyStage][ageLabel];

        if (requirements.macronutrients.hasOwnProperty(nutrientType.name)) {
          requirements.macronutrients[nutrientType.name] = (usrBio.gender === 'female') ? pregnancyIntake : normalIntake;
        } else if (requirements.hasOwnProperty(nutrientName)
          && requirements[nutrientName].hasOwnProperty(nutrientType.name)) {
          if (nutrientName === 'amino acids') {
            requirements[nutrientName][nutrientType.name] = (usrBio.gender === 'female') ? pregnancyIntake * usrBio.weight : normalIntake * usrBio.weight;
          } else {
            requirements[nutrientName][nutrientType.name] = (usrBio.gender === 'female') ? pregnancyIntake : normalIntake;
          }
        }
      }
    });

    return requirements;
  }

  private setMacronutrientRequirements(usrBio: Bio, requirements: Nutrition): Nutrition {
    this.macronutrients.subscribe(macronutrients => macronutrients.forEach(nutrient => {
      if (nutrient.hasOwnProperty('intake')) {
        this.setMacronutrientIntake(nutrient, usrBio, requirements);
      } else if (nutrient.hasOwnProperty('classification')) {
        this.setMacronutrientSubIntake(nutrient, usrBio, requirements);
      }
    }));
    return requirements;
  };

  private setMicronutrientRequirements(usrBio: Bio, requirements: Nutrition): Nutrition {
    let ageLabel: string = this.setAgeLabel(usrBio);
    this.micronutrients.subscribe(micronutrients => micronutrients.forEach(nutrient => {
      let normalIntake = nutrient.intake[usrBio.gender][ageLabel],
        pregnancyIntake = nutrient.intake[usrBio.gender][usrBio.pregnancyStage][ageLabel];
      if (requirements.vitamins.hasOwnProperty(nutrient.name)) {
        requirements.vitamins[nutrient.name] = (usrBio.gender === 'female') ? pregnancyIntake : normalIntake;
        if (nutrient.name === "Vitamin D") {
          requirements.vitamins['Vitamin D3'] = requirements.vitamins['Vitamin D2'] = (usrBio.gender === 'female') ? pregnancyIntake / 2 : normalIntake / 2;
        }
      } else if (requirements.minerals.hasOwnProperty(nutrient.name)) {
        requirements.minerals[nutrient.name] = (usrBio.gender === 'female') ? pregnancyIntake : normalIntake;
      }
    }));
    return requirements;
  };

  private setNutritionGoal(energyConsumption: number, requirements: Nutrition, usrBio: Bio): void {
    let proteinEnergy: number = 4.1,
      fatEnergy: number = 9,
      carbEnergy: number = 4.1,
      sugarEnergy: number = 2.4,
      fiberEnergy: number = 2;
    requirements.energy += energyConsumption + usrBio.bmr;
    requirements.energy = (usrBio.goal === 'lose weight') ? requirements.energy - 400 :
      (usrBio.goal === 'gain weight') ? requirements.energy + 400 : requirements.energy;
    requirements.macronutrients.Water = requirements.energy;
    requirements.macronutrients.Protein = requirements.energy * usrBio.energyBalance.protein / proteinEnergy;
    requirements.macronutrients.Carbohydrates = requirements.energy * usrBio.energyBalance.carbohydrates / carbEnergy;
    requirements.macronutrients.Fiber = requirements.energy * usrBio.energyBalance.carbohydrates * 0.15 / fiberEnergy;
    requirements.macronutrients.Sugars = requirements.energy * usrBio.energyBalance.carbohydrates * 0.3 / sugarEnergy;
    requirements.macronutrients.Sucrose = requirements.macronutrients.Sugars / 6;
    requirements.macronutrients.Fructose = requirements.macronutrients.Sugars / 6;
    requirements.macronutrients.Galactose = requirements.macronutrients.Sugars / 6;
    requirements.macronutrients.Maltose = requirements.macronutrients.Sugars / 6;
    requirements.macronutrients.Glucose = requirements.macronutrients.Sugars / 6;
    requirements.macronutrients.Lactose = requirements.macronutrients.Sugars / 6;
    requirements.macronutrients.Starch = requirements.macronutrients.Carbohydrates - requirements.macronutrients.Sugars - requirements.macronutrients.Fiber;
    requirements.macronutrients.Fats = requirements.energy * usrBio.energyBalance.fats / fatEnergy;
    requirements.macronutrients['Saturated fat'] = requirements.macronutrients.Fats * 0.33;
    requirements.sterols.Cholesterol = 300;
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

  public getNutritionRequirements(energyConsumption: number, userBio: Bio): Nutrition {
    let requirements: Nutrition = new Nutrition();
    this.setMacronutrientRequirements(userBio, requirements);
    this.setMicronutrientRequirements(userBio, requirements);
    this.setNutritionGoal(energyConsumption, requirements, userBio);
    return requirements;
  }
}
