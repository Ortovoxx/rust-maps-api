import axios from "axios";

import { version, name } from '../package.json';

import IMapOptions from './structures/MapOptions';
import IGetMap from './structures/GetMapResponse';
import IGetFilter from './structures/GetFilterResponse';
import IGenerateMap from './structures/GenerateMapResponse';

export default class RustMapsAPI {
    public readonly version: string;
    public readonly baseurl: string;
    public readonly apikey: string;

    constructor(apikey: string) {
        this.version = 'v2';
        this.baseurl = `https://rustmaps.com/api/${this.version}/maps/`;
        if (!apikey) throw new Error('You must provide an API key. Login here https://rustmaps.com/user/profile to obtain one');
        this.apikey = apikey;
    }

    private async request(method: 'POST' | 'GET', path: string, params?: {}) {
        const result = await axios({
            method: method,
            baseURL: this.baseurl,
            url: path,
            headers: {
                'X-API-Key': this.apikey,
                'User-Agent': `RustMapsAPI/${version} (https://www.npmjs.com/package/${name})`
            },
            params: params,
        });
        return result.data;
    }

    async getMap({ seed, size, barren, staging }: IMapOptions): Promise<IGetMap> {
        if (!seed || !size) throw new Error('You must provide a map seed and map size');
        const result: IGetMap = await this.request('GET', `${seed}/${size}`, { barren, staging })
        return result;
    }

    async getMapByID(mapID: string): Promise<IGetMap> {
        if (!mapID) throw new Error('You must provide a map seed and map size');
        const result: IGetMap = await this.request('GET', mapID)
        return result;
    }

    async filterMaps(filterID: string, page: number = 0): Promise<IGetFilter> {
        if (!filterID) throw new Error('You must provide a filter ID: Visit https://rustmaps.com/ and adjust your map requirements. In the red box above the settings hit the "Share" button, the string at the end of the URL is the filterId');
        const result: IGetFilter = await this.request('GET', filterID, { page })
        return result;
    }

    async generateMap({ seed, size, barren, staging }: IMapOptions): Promise<IGenerateMap> {
        if (!seed || !size) throw new Error('You must provide a map seed and map size');
        const result: IGenerateMap = await this.request('POST', `${seed}/${size}`, { barren, staging })
        return result;
    }

}