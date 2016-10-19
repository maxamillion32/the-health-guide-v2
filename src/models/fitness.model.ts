import { Nutrition } from './nutrition.model';

export class Fitness {
    constructor(
        public age: number = 18,
        public bmi: any = {
            data: 0,
            normal: true
        },
        public bmr: number = 0,
        public dailyRequirements: Nutrition = new Nutrition(),
        public energyBalance: any = {
            carbohydrates: 0.5,
            protein: 0.2,
            fats: 0.3
        },
        public fatPercentage: any = {
            data: 0,
            normal: true
        },
        public forearm: number = 26,
        public gender: string = 'male',
        public goal: string = 'maintain weight',
        public height: number = 180,
        public hips: number = 80,
        public infancy: string = 'no',
        public pregnancyStage: string = '',
        public waist: number = 75,
        public weight: number = 75,
        public wrist: number = 20
    ) {}
}