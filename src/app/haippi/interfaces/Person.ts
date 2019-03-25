namespace haippi {
    export interface Person {
        id?: string;
        name: string;
        eligibleFor: number;
        holding: number;
        order: number;
    }
}