import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { FitnessComponent }   from './fitness.component';

@NgModule({
  imports: [IonicModule.forRoot(FitnessComponent)],
  exports: [FitnessComponent],
  declarations: [FitnessComponent],
  providers: [],
})
export class FitnessModule { }
