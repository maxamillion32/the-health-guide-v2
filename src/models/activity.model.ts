export class Activity {
    constructor(
        public name: string = "",
        public met: number = 1,
        public time: number = 1,
        public energy: number = 0
        ) { }
}

export class ActivityGroup {
    constructor(
        public name: string = "",
        public types: Activity[] = [new Activity()]
        ) { }
}