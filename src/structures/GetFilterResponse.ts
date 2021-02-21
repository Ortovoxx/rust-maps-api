export default interface IGetFilter {
    results: Result[];
    page: number;
    perPage: number;
    lastPage: boolean;
}

export interface Result {
    id: string;
    seed: number;
    size: number;
}
