import { AngularFireModule } from 'angularfire2';
import { IonicApp, IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

import { MyApp } from './app.component';
import { FitnessPage } from '../pages/fitness/fitness';
import { FoodPage } from '../pages/food/food';
import { HomePage } from '../pages/home/home';
import { NutrientsPage } from '../pages/nutrients/nutrients';
import { RecipesPage } from '../pages/recipes/recipes';

export const firebaseConfig = {
  apiKey: "AIzaSyDCIDGR-i2jR0pyv2PCYot2ATDL0Xyd1-k",
  authDomain: "life-guiderta.firebaseapp.com",
  databaseURL: "https://life-guiderta.firebaseio.com",
  storageBucket: "life-guiderta.appspot.com"
};

@NgModule({
  declarations: [
    MyApp,
    FitnessPage,
    FoodPage,
    HomePage,
    NutrientsPage,
    RecipesPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FitnessPage,
    FoodPage,
    HomePage,
    NutrientsPage,
    RecipesPage
  ],
  providers: []
})
export class AppModule { }
