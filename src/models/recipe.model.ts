import { Nutrition } from './nutrition.model';

export class Recipe {
    constructor (
        public name: string = "",
        public category: string = "",
        public dietary: string[] = [],
        public chef: string = "",
        public ingredients: any[] = [],
        public duration: number = 0,
        public difficulty: string = "",
        public cookMethod: string = "",
        public cookTemperature: number = 0,
        public nutrition: Nutrition = new Nutrition(),
        public servings: number = 1,
        public steps: string[] = [""],
        public quantity: number = 0
    ) {}
}