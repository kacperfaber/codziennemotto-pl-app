import {TextSet} from "./textSet";
import {withTokenAsync} from "../withToken";
import {TextSetApi} from "../../api/textSet/textSetApi";
import {TextSetStore} from "../../store/textSet/textSetStore";
import {Text} from "./text";
import {Config} from "../../config/config";

export class TextSetService {
    static async fetchById(id: number): Promise<TextSet> {
        return withTokenAsync(
            token => TextSetApi.getById(id, token)
        );
    }

    static async fetchMine(): Promise<Array<TextSet>> {
        return withTokenAsync(async (token) => {
            const fetch = await TextSetApi.getMine(token);
            TextSetStore.mine(fetch);
            return fetch;
        });
    }

    static async fetchNotMine(): Promise<Array<TextSet>> {
        return withTokenAsync(async (token) => {
            const fetch = await TextSetApi.getNotMine(token);
            TextSetStore.notMine(fetch);
            return fetch;
        });
    }

    static async getMine(forceRefresh = false): Promise<Array<TextSet>> {
        const mine = TextSetStore.mine();

        if (!mine || forceRefresh) {
            return this.fetchMine();
        }

        return mine;
    }

    static async getNotMine(forceRefresh = false): Promise<Array<TextSet>> {
        const data = TextSetStore.mine();

        if (!data || forceRefresh) {
            return this.fetchNotMine();
        }

        return data;
    }

    static async fetchPastTexts(textSetId: number, forceRefresh=false): Promise<Array<Text>> {
        const url = `${Config.apiUrl}/text-set/`;

        // TODO: Here I want a endpoint to fetch all possible for me...
    }
}