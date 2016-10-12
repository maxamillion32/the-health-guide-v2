import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { IonicApp, IonicModule } from 'ionic-angular';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { ChartsModule } from "ng2-charts/ng2-charts";

// Components
import { NutritionTable } from '../components';

// Pages
import {
  Auth,
  FitnessModule,
  FoodList,
  Home,
  IngredientSearch,
  NutrientDetails,
  NutrientList,
  RecipeDetails,
  RecipeEdit,
  RecipeList
} from '../pages';

// Pipes
import { Limit, SearchFilter } from "../pipes";

// Providers
import { NutritionService, RecipeService } from "../providers";

// Root component
import { MyApp } from './app.component';

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBXdSjoVfk1KbbtmAUEq7ktnnI70ojg4y8",
  authDomain: "the-health-guide.firebaseapp.com",
  databaseURL: "https://the-health-guide.firebaseio.com",
  storageBucket: "the-health-guide.appspot.com",
  messagingSenderId: "283336744173"
};

const FIREBASE_AUTH_CONFIG = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    Auth,
    MyApp,
    FoodList,
    Home,
    IngredientSearch,
    Limit,
    NutrientDetails,
    NutrientList,
    NutritionTable,
    RecipeDetails,
    RecipeEdit,
    RecipeList,
    SearchFilter
  ],
  imports: [
    AngularFireModule.initializeApp(FIREBASE_CONFIG, FIREBASE_AUTH_CONFIG),
    ChartsModule,
    FitnessModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Auth,
    MyApp,
    FoodList,
    Home,
    IngredientSearch,
    NutrientDetails,
    NutrientList,
    NutritionTable,
    RecipeDetails,
    RecipeEdit,
    RecipeList
  ],
  providers: [NutritionService, RecipeService]
})
export class AppModule { }
