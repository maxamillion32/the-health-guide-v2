import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { FitnessPage } from '../pages/fitness/fitness';
import { FoodPage } from '../pages/food/food';
import { HomePage } from '../pages/home/home';
import { NutrientsPage } from '../pages/nutrients/nutrients';
import { RecipesPage } from '../pages/recipes/recipes';

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
  public rootPage = HomePage;
  public appPages: PageObj[] = [
    { title: 'Fitness', icon: 'bicycle', index: 4, component: FitnessPage },
    { title: 'Food', icon: 'cart', index: 1, component: FoodPage },
    { title: 'Home', icon: 'home', index: 0, component: HomePage },
    { title: 'Nutrients', icon: 'nutrition', index: 2, component: NutrientsPage },
    { title: 'Recipes', icon: 'restaurant', index: 3, component: RecipesPage },
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
