import { Component, OnInit, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { AngularFire } from "angularfire2";

// Pages
import {
  AuthPage,
  FitnessPage,
  FoodListPage,
  HomePage,
  JournalPage,
  NutrientListPage,
  RecipeListPage
} from '../pages';

// Models
import { Page } from '../models';

@Component({
  templateUrl: 'app.component.html',
})
export class HealthGuideApp implements OnInit {
  @ViewChild(Nav) nav: Nav;
  public avatarUrl: string;
  public appPages: Page[] = [
    { title: 'Home', icon: 'ios-home-outline', index: 0, component: HomePage },
    { title: 'Fitness', icon: 'ios-speedometer-outline', index: 1, component: FitnessPage },
    { title: 'Food', icon: 'ios-cart-outline', index: 2, component: FoodListPage },
    { title: 'Nutrients', icon: 'ios-nutrition-outline', index: 3, component: NutrientListPage },
    { title: 'Recipes', icon: 'ios-restaurant-outline', index: 4, component: RecipeListPage },
    { title: 'Journal', icon: 'ios-book-outline', index: 5, component: JournalPage }
  ];
  public rootPage = AuthPage;
  public username: string;

  constructor(private af: AngularFire, private platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  public logout(): void {
    this.nav.setRoot(AuthPage, {
      logout: true
    });
    this.af.auth.logout();
  }

  public openPage(page): void {
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });

    } else {
      this.nav.setRoot(page.component);
    }
  }

  ngOnInit(): void {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.username = auth.auth.providerData[0].displayName;
        this.avatarUrl = auth.auth.providerData[0].photoURL;
      }
    })
  }
}
