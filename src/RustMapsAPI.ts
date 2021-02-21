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
