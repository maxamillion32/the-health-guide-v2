import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { Fitness } from '../pages/fitness/fitness';
import { FoodList } from '../pages/food/food-list/food-list';
import { Home } from '../pages/home/home';
import { NutrientList } from '../pages/nutrients/nutrient-list/nutrient-list';
import { RecipeList } from '../pages/recipes/recipe-list/recipe-list';

export interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  templateUrl: 'app.component.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public rootPage = Home;
  public appPages: PageObj[] = [
    { title: 'Home', icon: 'ios-home-outline', index: 0, component: Home },
    { title: 'Fitness', icon: 'ios-speedometer-outline', index: 1, component: Fitness },
    { title: 'Food', icon: 'ios-cart-outline', index: 2, component: FoodList },
    { title: 'Nutrients', icon: 'ios-nutrition-outline', index: 3, component: NutrientList },
    { title: 'Recipes', icon: 'ios-book-outline', index: 4, component: RecipeList }
  ];

  constructor(private platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  public openPage(page): void {
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});

    } else {
      this.nav.setRoot(page.component);
    }
  }
}
