import { AngularFireModule } from 'angularfire2';
import { IonicApp, IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

// Root component
import { MyApp } from './app.component';

// Pages
import { Fitness } from '../pages/fitness/fitness';
import { FoodList } from '../pages/food/food-list/food-list';
import { Home } from '../pages/home/home';
import { NutrientList } from '../pages/nutrients/nutrient-list/nutrient-list';
import { RecipeList } from '../pages/recipes/recipe-list/recipe-list';

// Providers
import { NutritionService } from "../providers/nutrition.service";

export const firebaseConfig = {
  apiKey: "AIzaSyDCIDGR-i2jR0pyv2PCYot2ATDL0Xyd1-k",
  authDomain: "life-guiderta.firebaseapp.com",
  databaseURL: "https://life-guiderta.firebaseio.com",
  storageBucket: "life-guiderta.appspot.com"
};

@NgModule({
  declarations: [
    MyApp,
    Fitness,
    FoodList,
    Home,
    NutrientList,
    RecipeList
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Fitness,
    FoodList,
    Home,
    NutrientList,
    RecipeList
  ],
  providers: [NutritionService]
})
export class AppModule { }
