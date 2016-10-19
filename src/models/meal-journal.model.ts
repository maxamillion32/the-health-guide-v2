import { Nutrition } from '../models';

export class MealJournal {
    constructor (
        public date: string = "",
        public breakfast: any = {
            meals: [],
            total: new Nutrition()
        },
        public brunch: any = {
            meals: [],
            total: new Nutrition()
        },
        public lunch: any = {
            meals: [],
            total: new Nutrition()
        },
        public snack: any = {
            meals: [],
            total: new Nutrition()
        },
        public dinner: any = {
            meals: [],
            total: new Nutrition()
        },
        public remainingNutrition: Nutrition = new Nutrition(),
        public requiredNutrition: Nutrition = new Nutrition(),
        public totalNutrition: Nutrition = new Nutrition()
    ) { }
}