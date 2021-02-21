export default interface IGetMap {
    id: string;
    staging: boolean;
    barren: boolean;
    seed: number;
    size: number;
    monuments: Monument[];
    url: string;
    imageUrl: string;
    imageIconUrl: string;
    thumbnailUrl: string;
}

export interface Monument {
    prefab: string;
    monument: string;
    biome: string;
    x: number;
    y: number;
}