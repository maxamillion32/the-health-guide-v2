import { Activity } from "./activity.model";

export class ActivityPlan {
    date: string;
    activities: Activity[];
    totalEnergy: number;
    totalDuration: number;
}