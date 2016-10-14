import { Nutrition } from './nutrition.model';

export class Bio {
    constructor(
        public age: number = 0,
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
        public forearm: number = 0,
        public gender: string = 'male',
        public goal: string = 'maintain weight',
        public height: number = 0,
        public hips: number = 0,
        public infancy: string = 'no',
        public pregnancyStage: string = '',
        public waist: number = 0,
        public weight: number = 0,
        public wrist: number = 0
    ) {}
}