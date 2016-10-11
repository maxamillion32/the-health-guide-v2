import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { AngularFire, FirebaseAuth, FirebaseListObservable } from 'angularfire2';

import { Nutrition, Recipe } from '../models';

@Injectable()
export class RecipeService {
  private allUsersRecipes: FirebaseListObservable<Recipe[]>;
  private userRecipes: FirebaseListObservable<Recipe[]>;
  constructor(private af: AngularFire, private auth: FirebaseAuth) {
    this.allUsersRecipes = af.database.list('/recipes', {
      query: {
        orderByChild: 'name'
      }
    });
    this.auth.subscribe(authData => {
      this.userRecipes = af.database.list(`/recipes/${authData.uid}`, {
        query: {
          orderByChild: 'name'
        }
      });
    });
  }

  private removeIngredientKeys(recipe: Recipe): void {
    recipe.ingredients.forEach(ingredient => {
      if (ingredient.hasOwnProperty('$key')) {
        delete ingredient['$key'];
      }
      if (ingredient.hasOwnProperty('$exists')) {
        delete ingredient['$exists'];
      }
    });
  }

  public addRecipe(recipe: Recipe): void {
    this.removeIngredientKeys(recipe);
    this.userRecipes.push(recipe);
  }

  public calcRecipeNutrition(recipe: Recipe): Nutrition {
    let rcpNutrition: Nutrition = new Nutrition();
    // Set total recipe nutrition and quantity in grams
    recipe.ingredients.forEach(ingredient => {
      // Check if the ingredient of the recipe is another recipe
      if (ingredient.hasOwnProperty('chef')) {
        for (let nutrientCategory in ingredient.nutrition) {
          let nutrients = ingredient.nutrition[nutrientCategory];
          if (nutrientCategory === 'energy') {
            rcpNutrition[nutrientCategory] += nutrients * ingredient.amount;
          } else if (typeof nutrients === 'object') {
            for (let nutrient in nutrients) {
              rcpNutrition[nutrientCategory][nutrient] += nutrients[nutrient] * ingredient.amount;
            }
          }
        }
      } else {
        for (let nutrientCategory in ingredient) {
          let nutrients = ingredient[nutrientCategory];
          if (nutrientCategory === 'energy') {
            rcpNutrition[nutrientCategory] += nutrients * (ingredient.quantity / 100);
          } else if (typeof nutrients === 'object') {
            for (let nutrient in nutrients) {
              rcpNutrition[nutrientCategory][nutrient] += nutrients[nutrient] * (ingredient.quantity / 100);
            }
          }
        }
      }

      recipe.quantity += ingredient.quantity;
    });

    // Set nutrition and quantity per recipe serving
    for (let nutrientCategory in rcpNutrition) {
      let nutrients = rcpNutrition[nutrientCategory];
      if (nutrientCategory === 'energy') {
        rcpNutrition[nutrientCategory] /= +recipe.servings;
      }
      for (let nutrient in nutrients) {
        rcpNutrition[nutrientCategory][nutrient] /= +recipe.servings;
      }
    }

    recipe.quantity /= +recipe.servings;
    return rcpNutrition;
  }

  public getAllRecipes(): Observable<any> {
    let allRecipes: Recipe[] = [];
    return new Observable(observer => {
      this.allUsersRecipes.subscribe(users => users.forEach(userRecipes => {
        if (userRecipes) {
          for (let recipeKey in userRecipes) {
            let recipe = userRecipes[recipeKey];
            if (recipe.ingredients) {
              allRecipes.push(recipe);
            }
          }
          observer.next(allRecipes);
        }
      }));
    });

  }

  public getMyRecipes(): FirebaseListObservable<Recipe[]> {
    return this.userRecipes;
  }

  public removeRecipe(recipe: Recipe): void {
    this.userRecipes.remove(recipe['$key']);
  }

  public updateRecipe(recipe: Recipe): void {
    this.removeIngredientKeys(recipe);
    this.userRecipes.update(recipe['$key'], {
      name: recipe.name,
      category: recipe.category,
      dietaries: recipe.dietaries,
      chef: recipe.chef,
      ingredients: recipe.ingredients,
      duration: recipe.duration,
      difficulty: recipe.difficulty,
      cookMethod: recipe.cookMethod,
      cookTemperature: recipe.cookTemperature,
      nutrition: recipe.nutrition,
      servings: recipe.servings,
      steps: recipe.steps,
      quantity: recipe.quantity
    });
  }
}