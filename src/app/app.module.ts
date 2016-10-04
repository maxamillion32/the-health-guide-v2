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
import { SearchPipe } from "../pipes";

// Providers
import { NutritionService } from "../providers";

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
    NutrientDetails,
    NutrientList,
    RecipeList,
    SearchPipe
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
