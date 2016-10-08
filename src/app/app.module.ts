import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { IonicApp, IonicModule } from 'ionic-angular';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// Components
import { NutritionTable } from '../components';

// Pages
import {
  Auth,
  Fitness,
  FoodList,
  Home,
  NutrientDetails,
  NutrientList,
  RecipeDetails,
  RecipeList
} from '../pages';

// Pipes
import { Limit, SearchFilter } from "../pipes";

// Providers
import { NutritionService, RecipeService } from "../providers";

// Root component
import { MyApp } from './app.component';

export const firebaseConfig = {
  apiKey: "AIzaSyBXdSjoVfk1KbbtmAUEq7ktnnI70ojg4y8",
  authDomain: "the-health-guide.firebaseapp.com",
  databaseURL: "https://the-health-guide.firebaseio.com",
  storageBucket: "the-health-guide.appspot.com",
  messagingSenderId: "283336744173"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    Auth,
    MyApp,
    Fitness,
    FoodList,
    Home,
    Limit,
    NutrientDetails,
    NutrientList,
    NutritionTable,
    RecipeDetails,
    RecipeList,
    SearchFilter
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Auth,
    MyApp,
    Fitness,
    FoodList,
    Home,
    NutrientDetails,
    NutrientList,
    NutritionTable,
    RecipeDetails,
    RecipeList
  ],
  providers: [NutritionService, RecipeService]
})
export class AppModule { }
