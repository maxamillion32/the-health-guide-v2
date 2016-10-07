import { Nutrition } from './nutrition.model';

export class Food extends Nutrition {
    constructor(
        public name: string = "",
        public category: string = "",
        public energy: number = 0,
        public quantity: number = 100
    ) { 
        super();
     }
}