import { Food } from "./food.model";
import { Nutrient } from './nutrient.model';

export class Recipe {
    name: string;
    category: string;
    dietary: string;
    chef: string;
    ingredients: Food[];
    prepTime: number;
    cookMethod: string;
    cookTime: number;
    cookTemperature: number;
    nutrients: Nutrient[];
    servings: number;
    steps?: string[];
    quantity?: number;
}