import { Nutrient } from './nutrient.model';

export class Recipe {
    constructor (
        public name: string = "",
        public category: string = "",
        public dietary: string = "",
        public chef: string = "",
        public ingredients: any[] = [],
        public prepTime: number = 0,
        public cookMethod: string = "",
        public cookTime: number = 0,
        public cookTemperature: number = 0,
        public nutrients: Nutrient[],
        public servings: number = 1,
        public steps: string[] = [""],
        public quantity: number = 0
    ) {}
}