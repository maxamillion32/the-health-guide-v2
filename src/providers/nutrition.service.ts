import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Fitness, Food, Nutrient, Nutrition } from "../models";

@Injectable()
export class NutritionService {
  private food: FirebaseListObservable<Food[]>;
  private macronutrients: FirebaseListObservable<Nutrient[]>;
  private micronutrients: FirebaseListObservable<Nutrient[]>;

  constructor(private af: AngularFire) {
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

  private setAgeLabel(userFitness: Fitness): string {
    let ageLabel: string = '';
    if (userFitness.infancy === 'yes') {
      ageLabel = (userFitness.age <= 6) ? "0-6 months" : "7-12 months";
    } else {
      ageLabel = (userFitness.age <= 3) ? "1-3 years" :
        (userFitness.age <= 8) ? "4-8 years" :
          (userFitness.age <= 13) ? "9-13 years" :
            (userFitness.age <= 18) ? "14-18 years" :
              (userFitness.age <= 50) ? "19-50 years" :
                (userFitness.age <= 70) ? "50-70 years" : "70+ years";
    }
    return ageLabel;
  };

  private setMacronutrientIntake(nutrient: Nutrient, userFitness: Fitness, requirements: Nutrition): Nutrition {
    let ageLabel: string = this.setAgeLabel(userFitness);
    if (requirements.macronutrients.hasOwnProperty(nutrient.name)) {
      // The macronutrient matches to the one we have in the macronutrients group
      requirements.macronutrients[nutrient.name] = (userFitness.gender === 'female')
        ? nutrient.intake[userFitness.gender][userFitness.pregnancyStage][ageLabel]
        : nutrient.intake[userFitness.gender][ageLabel];
    }
    if (nutrient.hasOwnProperty('classification')) {
      // Check if the macronutrient has subgroups that we have in the macronutrients
      // (e.g. "Monounsaturated fat" is a subgroup of "Fats")
      nutrient.classification.forEach(nutrientType => {
        if (nutrientType.hasOwnProperty('intake')) {
          // Check if it has recommended intake
          if (requirements.macronutrients.hasOwnProperty(nutrientType.name)) {
            requirements.macronutrients[nutrientType.name] = (userFitness.gender === 'female')
              ? nutrientType.intake[userFitness.gender][userFitness.pregnancyStage][ageLabel]
              : nutrientType.intake[userFitness.gender][ageLabel];
          }
        }
      });
    }
    return requirements;
  }

  private setMacronutrientSubIntake(nutrient: Nutrient, userFitness: Fitness, requirements: Nutrition): Nutrition {
    // The nutrient is divided in subgroups that maybe have intakes (e.g. "Amino acids")
    let nutrientName = nutrient.name.toLowerCase(), ageLabel: string = this.setAgeLabel(userFitness);
    nutrient.classification.forEach(nutrientType => {
      if (nutrientType.hasOwnProperty('intake')) {
        // Check if it has recommended intake and if
        // the current nutrient group matches to one we have
        if (requirements.macronutrients.hasOwnProperty(nutrientType.name)) {
          requirements.macronutrients[nutrientType.name] = (userFitness.gender === 'female')
            ? nutrientType.intake[userFitness.gender][userFitness.pregnancyStage][ageLabel]
            : nutrientType.intake[userFitness.gender][ageLabel];
        } else if (requirements.hasOwnProperty(nutrientName)
          && requirements[nutrientName].hasOwnProperty(nutrientType.name)) {
          if (nutrientName === 'amino acids') {
            requirements[nutrientName][nutrientType.name] = (userFitness.gender === 'female')
              ? nutrientType.intake[userFitness.gender][userFitness.pregnancyStage][ageLabel] * userFitness.weight
              : nutrientType.intake[userFitness.gender][ageLabel] * userFitness.weight;
          } else {
            requirements[nutrientName][nutrientType.name] = (userFitness.gender === 'female')
              ? nutrientType.intake[userFitness.gender][userFitness.pregnancyStage][ageLabel]
              : nutrientType.intake[userFitness.gender][ageLabel];
          }

        }
      }
    });

    return requirements;
  }

  private setMacrorequirements(userFitness: Fitness, requirements: Nutrition): Nutrition {
    this.macronutrients.subscribe(macronutrients => {
      if (!!macronutrients) {
        macronutrients.forEach(nutrient => {
          if (nutrient.hasOwnProperty('intake')) {
            this.setMacronutrientIntake(nutrient, userFitness, requirements);
          } else if (nutrient.hasOwnProperty('classification')) {
            this.setMacronutrientSubIntake(nutrient, userFitness, requirements);
          }
        })
      }
    });
    return requirements;
  };

  private setMicrorequirements(userFitness: Fitness, requirements: Nutrition): Nutrition {
    let ageLabel: string = this.setAgeLabel(userFitness);
    this.micronutrients.subscribe(micronutrients => {
      if (!!micronutrients) {
        micronutrients.forEach(nutrient => {
          if (requirements.vitamins.hasOwnProperty(nutrient.name)) {
                requirements.vitamins[nutrient.name] = (userFitness.gender === 'female')
                    ? nutrient.intake[userFitness.gender][userFitness.pregnancyStage][ageLabel]
                    : nutrient.intake[userFitness.gender][ageLabel];
            } else if (requirements.minerals.hasOwnProperty(nutrient.name)) {
                requirements.minerals[nutrient.name] = (userFitness.gender === 'female')
                    ? nutrient.intake[userFitness.gender][userFitness.pregnancyStage][ageLabel]
                    : nutrient.intake[userFitness.gender][ageLabel];
            }
            if (nutrient.name === "Vitamin D") {
                requirements.vitamins['Vitamin D3'] = requirements.vitamins['Vitamin D2'] = (userFitness.gender === 'female')
                    ? nutrient.intake[userFitness.gender][userFitness.pregnancyStage][ageLabel] / 2
                    : nutrient.intake[userFitness.gender][ageLabel] / 2;
            }
        });
      }
    });
    return requirements;
  };

  private setNutritionGoal(energyConsumption: number, requirements: Nutrition, userFitness: Fitness): void {
    let proteinEnergy: number = 4.1,
      fatEnergy: number = 9,
      carbEnergy: number = 4.1,
      sugarEnergy: number = 2.4,
      fiberEnergy: number = 2;
    requirements.energy += energyConsumption + userFitness.bmr;
    requirements.energy = (userFitness.goal === 'lose weight') ? requirements.energy - 400 :
      (userFitness.goal === 'gain weight') ? requirements.energy + 400 : requirements.energy;
    requirements.macronutrients.Water = requirements.energy;
    requirements.macronutrients.Protein = requirements.energy * userFitness.energyBalance.protein / proteinEnergy;
    requirements.macronutrients.Carbohydrates = requirements.energy * userFitness.energyBalance.carbohydrates / carbEnergy;
    requirements.macronutrients.Fiber = requirements.energy * userFitness.energyBalance.carbohydrates * 0.15 / fiberEnergy;
    requirements.macronutrients.Sugars = requirements.energy * userFitness.energyBalance.carbohydrates * 0.3 / sugarEnergy;
    requirements.macronutrients.Sucrose = requirements.macronutrients.Sugars / 6;
    requirements.macronutrients.Fructose = requirements.macronutrients.Sugars / 6;
    requirements.macronutrients.Galactose = requirements.macronutrients.Sugars / 6;
    requirements.macronutrients.Maltose = requirements.macronutrients.Sugars / 6;
    requirements.macronutrients.Glucose = requirements.macronutrients.Sugars / 6;
    requirements.macronutrients.Lactose = requirements.macronutrients.Sugars / 6;
    requirements.macronutrients.Starch = requirements.macronutrients.Carbohydrates - requirements.macronutrients.Sugars - requirements.macronutrients.Fiber;
    requirements.macronutrients.Fats = requirements.energy * userFitness.energyBalance.fats / fatEnergy;
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

  public getNutritionRequirements(energyConsumption: number, userFitness: Fitness): Nutrition {
    let requirements: Nutrition = new Nutrition();
    this.setMacrorequirements(userFitness, requirements);
    this.setMicrorequirements(userFitness, requirements);
    this.setNutritionGoal(energyConsumption, requirements, userFitness);
    return requirements;
  }
}
