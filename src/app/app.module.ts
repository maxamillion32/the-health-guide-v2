import { AngularFireModule } from 'angularfire2';
import { IonicApp, IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

// Root component
import { MyApp } from './app.component';

// Pages
import {
  Fitness,
  FoodList,
  Home,
  NutrientDetails,
  NutrientList,
  RecipeList
} from '../pages';

// Pipes
import { Limit, SearchFilter } from "../pipes";

// Providers
import { NutritionService } from "../providers";

export const firebaseConfig = {
  apiKey: "AIzaSyBXdSjoVfk1KbbtmAUEq7ktnnI70ojg4y8",
  authDomain: "the-health-guide.firebaseapp.com",
  databaseURL: "https://the-health-guide.firebaseio.com",
  storageBucket: "the-health-guide.appspot.com",
  messagingSenderId: "283336744173"
};

@NgModule({
  declarations: [
    MyApp,
    Fitness,
    FoodList,
    Home,
    Limit,
    NutrientDetails,
    NutrientList,
    RecipeList,
    SearchFilter
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
    NutrientDetails,
    NutrientList,
    RecipeList
  ],
  providers: [NutritionService]
})
export class AppModule { }
