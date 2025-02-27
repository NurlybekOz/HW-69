
export interface IShow {
    id: number;
    name: string;
    summary: string;
    image: {
        medium: string;
    }
}

export interface IFetchedShow {
    score: number;
    show: IShow;
}
