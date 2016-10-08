import { Component, Input } from '@angular/core';

@Component({
  selector: 'nutrition-table',
  templateUrl: 'nutrition-table.html'
})
export class NutritionTable {

  @Input() nutritionData: any;
  @Input() percentage: boolean = false;

  constructor() { }

}
